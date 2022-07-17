import { ClientOnly } from 'remix-utils';
import type { EditorCallbacks } from './innerEditor.client';
import InnerEditor from './innerEditor.client';
import { Links } from '@remix-run/react';
import type { DayTask } from '../../typings/task';
import { cachedOrNewer, pushTodaysTask, rawmd2tasks, todaysDayID } from '../../lib/task';
import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { throttle } from 'lodash';
import { setNoteCache, getNoteCache, removeNoteCache } from 'lib/localstorage';
import Preview from './preview';
import type { EditorMode } from 'typings/editor';
import useStore from 'store';
import TaskAnalysisPanel from 'components/task/TaskAnalysisPanel';
import Loading from 'components/common/Loading';
import EditorToolBar from './editorToolBar';

const THROTTLE_MS = 500;
const LOCAL_SAVECACHE_MS = 1000 * 5;

export default function Editor({ initialDtask = null, dontCache = false }:
  { initialDtask?: DayTask | null, dontCache?: boolean },
) {
  const { user } = useStore();
  const [isDirty, setIsDirty] = useState(false);
  const [mode, setMode] = useState<EditorMode>('view');
  const [dtask, setDtask] = useState<DayTask>(initialDtask || {
    day_id: todaysDayID(),
    note_md: '',
    tasks: [],
    owner: user === 'pending' || user === null ? null : user.uid,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const saveCache = useCallback(() => {
    if (isDirty) {
      setNoteCache(dtask.note_md, dtask.day_id);
      setIsDirty(false);
    }
  }, [isDirty, dtask]);

  const callbacks: EditorCallbacks = {
    onChange: throttle((note) => {
      setDtask({ ...dtask, note_md: note, tasks: rawmd2tasks(note) });
      setIsDirty(true);
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
    const saveCacheIntervalHdlr = setInterval(saveCache, LOCAL_SAVECACHE_MS);
    return () => clearInterval(saveCacheIntervalHdlr);
  }, [dontCache, saveCache]);

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

  const onSaveClick = async () => {
    const updatedAt = await pushTodaysTask(dtask);
    removeNoteCache(dtask.day_id);
    setDtask({ ...dtask, updatedAt });
  };

  const onSwitchModeClick = () => {
    setMode(mode === 'edit' ? 'view' : 'edit');
  };

  return (
    <div>
      <Links />

      {user === 'pending' ?
        <Loading /> :
        <div>
          <EditorToolBar dtask={dtask} mode={mode} onSaveClick={onSaveClick} onSwitchModeClick={onSwitchModeClick} />
          <div className='mt-2'>
            {mode === 'edit' ? (
              <ClientOnly fallback={<div>SSR not supported for this component</div>}>
                {() => <InnerEditor callbacks={callbacks} rawmd={dtask.note_md} />}
              </ClientOnly>
            ) :
              <div>
                <div>
                  <TaskAnalysisPanel dtask={dtask}/>
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
