import { ClientOnly } from 'remix-utils';
import type { EditorCallbacks } from './innerEditor.client';
import InnerEditor from './innerEditor.client';
import { Links } from '@remix-run/react';
import type { DayTask, Task } from '../../typings/task';
import {
  cachedOrNewer, fetchLatestTask, pushTodaysTask, rawmd2tasks, todaysDayID, updateSingleTask,
} from '../../lib/task';
import { useCallback, useRef, useState } from 'react';
import { useEffect } from 'react';
import { throttle } from 'lodash';
import { setNoteCache, getNoteCache, removeNoteCache } from 'lib/localstorage';
import Preview from './preview';
import type { EditorMode } from 'typings/editor';
import useStore from 'store';
import TaskAnalysisPanel from 'components/task/TaskAnalysisPanel';
import Loading from 'components/common/Loading';
import EditorToolBar from './editorToolBar';
import type { DirtySyncStatus } from './button/dirtyIndicator';
import type { EmojiInstance } from 'lib/cmemoji';
import axios from 'axios';
import { Element, scroller } from 'react-scroll';

const THROTTLE_MS = 500; // 500ms
const LOCAL_SAVECACHE_MS = 1000 * 5; // 5s
const REMOTE_SAVE_MS = 1000 * 10; // 10s

export default function Editor({ initialDtask = null, dontCache = false, mockSave = false }:
  { initialDtask?: DayTask | null, dontCache?: boolean, mockSave?: boolean },
) {
  const { user } = useStore();
  const [isDirty, setIsDirty] = useState(false);
  const [isDirtyRemote, setIsDirtyRemote] = useState(false);
  const [mode, setMode] = useState<EditorMode>('view');
  const [indicatorStatus, setIndicatorStatus] = useState<DirtySyncStatus>('synced');
  const [emojiList, setEmojiList] = useState<EmojiInstance[]>([]);
  const [dtask, setDtask] = useState<DayTask>(initialDtask || {
    day_id: todaysDayID(),
    note_md: '',
    tasks: [],
    owner: user === 'pending' || user === null ? null : user.uid,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const saveCacheRef = useRef<() => void>();
  const saveRemoteRef = useRef<() => void>();
  const saveCache = useCallback(() => {
    if (isDirty) {
      setNoteCache(dtask.note_md, dtask.day_id);
      setIsDirty(false);
    }
  }, [isDirty, dtask]);
  const saveRemote = useCallback(async () => {
    if (isDirtyRemote) {
      setIsDirtyRemote(false);
      setIndicatorStatus('syncing');
      await pushTodaysTask(dtask);
      setIndicatorStatus('synced');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirtyRemote, dtask]);
  const onTaskClick = useCallback((task: Task) => {
    const clickedTask = dtask.tasks.find((t) => t === task);
    if (!clickedTask) return;
    setDtask({ ...updateSingleTask(dtask, { ...clickedTask, done: !clickedTask.done }) });
    setIsDirty(true);
    setIsDirtyRemote(true);
  }, [dtask, setDtask]);

  useEffect(() => {
    if (!isDirtyRemote) setIndicatorStatus('synced');
    else setIndicatorStatus('dirty');
  }, [isDirty, isDirtyRemote]);

  // Update ref instance of callbacks
  useEffect(() => {
    saveCacheRef.current = saveCache;
    saveRemoteRef.current = saveRemote;
  }, [saveCache, saveRemote]);

  // Fetch emoji list
  useEffect(() => {
    (async () => {
      if (emojiList.length !== 0) return;
      const res = await axios.get('https://api.github.com/emojis');
      if (res.status !== 200) {
        console.log('Failed to fetch emoji list.');
        return;
      }
      setEmojiList(Object.keys(res.data).map((key) => (
        { name: key, url: res.data[key] }
      )));
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const callbacks: EditorCallbacks = {
    onChange: throttle((note) => {
      setDtask({ ...dtask, note_md: note, tasks: rawmd2tasks(note) });
      setIsDirty(true);
      setIsDirtyRemote(true);
    }, THROTTLE_MS),
  };

  // Set UID to dtask
  useEffect(() => {
    if (user === 'pending') return;
    setDtask({ ...dtask, owner: user?.uid ?? null });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Set handler to save note cache to local storage
  useEffect(() => {
    if (dontCache) return;
    const saveCacheIntervalHdlr = setInterval(() => saveCacheRef.current?.(), LOCAL_SAVECACHE_MS);
    return () => clearInterval(saveCacheIntervalHdlr);
  }, [dontCache]);

  // Set handler to save note to remote server
  useEffect(() => {
    if (dontCache) return;
    const saveRemoteIntervalHdlr = setInterval(() => saveRemoteRef.current?.(), REMOTE_SAVE_MS);
    return () => clearInterval(saveRemoteIntervalHdlr);
  }, [dontCache]);

  // Restoe cached note from local storage
  useEffect(() => {
    if (dontCache) return;
    const cachedNote = getNoteCache(dtask.day_id);
    if (cachedNote) {
      setDtask({ ...dtask, note_md: cachedOrNewer(cachedNote, dtask) });
      removeNoteCache(cachedNote.dayId);
    } else {
      console.log('No cached note found');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSaveClick = useCallback(async () => {
    setIndicatorStatus('syncing');
    if (mockSave) {
      setIndicatorStatus('synced');
      return;
    }
    const updatedAt = await pushTodaysTask(dtask);
    removeNoteCache(dtask.day_id);
    setDtask({ ...dtask, updatedAt });
    setIndicatorStatus('synced');
  }, [dtask, setDtask, setIndicatorStatus, mockSave]);

  const onSwitchModeClick = () => {
    scroller.scrollTo('editor', {
      duration: 500,
      offset: -80,
      smooth: true,
    });
    setMode(mode === 'edit' ? 'view' : 'edit');
  };

  return (
    <div>
      <Links />

      {user === 'pending' ?
        <Loading /> :
        <div className='w-full'>
          <div>
            <Element name='editor' />
            <EditorToolBar dtask={dtask} mode={mode} indStatus={indicatorStatus}
              callbacks={{
                onSaveClick,
                onSwitchModeClick,
                onCopyPreviousClicked: () => {
                  (async () => {
                    const uid = user?.uid ?? null;
                    if (!uid) return;
                    const prevTask = await fetchLatestTask(uid);
                    if (prevTask) setDtask({ ...dtask, note_md: prevTask.note_md });
                    setIsDirty(true);
                  })();
                },
              }}
            />
          </div>
          <div className='mt-2'>
            {mode === 'edit' ? (
              <ClientOnly fallback={<div>SSR not supported for this component</div>}>
                {() => <InnerEditor callbacks={callbacks} rawmd={dtask.note_md} emojiList={emojiList} />}
              </ClientOnly>
            ) :
              <div>
                <div>
                  <TaskAnalysisPanel dtask={dtask} onTaskClick={onTaskClick} />
                </div>
                <div className='mt-4'>
                  <Preview rawmd={dtask.note_md} />
                </div>
              </div>
            }
          </div>
        </div>
      }
    </div>
  );
}
