import { DEFAULT_DTASK, fetchTodaysTask } from 'lib/task';
import { useEffect, useState } from 'react';
import type { DayTask } from 'typings/task';
import Editor from 'components/editor/Editor';
import useStore from 'store';

export default function Today() {
  const [restoredTask, setRestoredTask] = useState<DayTask | null>(null);
  const { user } = useStore();

  useEffect(() => {
    (async () => {
      const uid = user?.uid;
      if (uid) {
        const todaysTask = await fetchTodaysTask(uid);
        if (todaysTask) {
          setRestoredTask(todaysTask);
          console.log('Fetched remote saved task');
        } else {
          setRestoredTask({
            ...DEFAULT_DTASK,
            createdAt: new Date(),
            owner: user.uid,
          });
        }
      }
    })();
  }, [user]);

  return (
    <div>
      {restoredTask === null ?
        <div>Loading...</div> :
        <Editor initialDtask={restoredTask} />
      }
    </div>
  );
};
