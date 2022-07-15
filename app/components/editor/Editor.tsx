import { ClientOnly } from 'remix-utils';
import type { EditorCallbacks } from './innerEditor.client';
import InnerEditor from './innerEditor.client';
import { Links } from '@remix-run/react';
import SaveButton from './saveButton';
import SwitchModeButton from './switchModeButton';
import type { DayTask } from '../../typings/task';
import { pushTodaysTask, rawmd2tasks, todaysDayID } from '../../lib/task';
import { useState } from 'react';
import { useEffect } from 'react';
import { throttle } from 'lodash';
import { setNoteCache, getNoteCache, removeNoteCache } from 'lib/localstorage';
import Preview from './preview';
import type { EditorMode } from 'typings/editor';
import useStore from 'store';
import TaskAnalysisPanel from 'components/task/TaskAnalysisPanel';

const THROTTLE_MS = 500;
const LOCAL_SAVECACHE_MS = 1000 * 5;

export default function Editor({ initialDtask = null, dontCache = false }:
  { initialDtask?: DayTask | null, dontCache?: boolean },
) {
  const { user } = useStore();
  const [mode, setMode] = useState<EditorMode>('view');
  const [dtask, setDtask] = useState<DayTask>(initialDtask || {
    day_id: todaysDayID(),
    note_md: '',
    tasks: [],
    owner: user?.uid ?? null,
  });

  const callbacks: EditorCallbacks = {
    onChange: throttle((note) => {
      setDtask({ ...dtask, note_md: note, tasks: rawmd2tasks(note) });
    }, THROTTLE_MS),
  };

  // Set UID to dtask
  useEffect(() => {
    setDtask({ ...dtask, owner: user?.uid ?? null });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Set handler to save note cache to local storage
  useEffect(() => {
    if (dontCache) return;
    const saveCacheIntervalHdlr = setInterval(() => {
      setNoteCache(dtask.note_md, dtask.day_id);
    }, LOCAL_SAVECACHE_MS);

    return () => clearInterval(saveCacheIntervalHdlr);
  }, [dontCache, dtask]);

  // Restoe cached note from local storage
  useEffect(() => {
    if (dontCache) return;
    const cachedNote = getNoteCache(dtask.day_id);
    if (cachedNote) {
      setDtask({ ...dtask, note_md: cachedNote.rawMd });
      console.log(`Restored note from cache saved at ${cachedNote.savedAt}`);
      removeNoteCache(cachedNote.dayId);
    } else {
      console.log('No cached note found');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSaveClick = async () => {
    await pushTodaysTask(dtask);
    removeNoteCache(dtask.day_id);
  };

  const onSwitchModeClick = () => {
    setMode(mode === 'edit' ? 'view' : 'edit');
  };

  return (
    <div>
      <Links />

      <div className='flex mt-2 mx-2 md:px-8 justify-between justify-items-end'>
        <SaveButton callback={onSaveClick}/>
        <SwitchModeButton callback={onSwitchModeClick} mode={mode} />
      </div>
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
  );
}
