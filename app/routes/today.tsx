import { fetchTodaysTask } from 'lib/task';
import { useEffect, useState } from 'react';
import type { DayTask } from 'typings/task';
import Editor from 'components/editor/Editor';
import useStore from 'store';

export default function Today() {
  const [restoredTask, setRestoredTask] = useState<DayTask | null>(null);
  const [loaded, setLoaded] = useState(false);
  const { user } = useStore();

  useEffect(() => {
    (async () => {
      const uid = user?.uid;
      if (uid) {
        const todaysTask = await fetchTodaysTask(uid);
        if (todaysTask) {
          setRestoredTask(todaysTask);
        }
      }
      setLoaded(true);
    })();
  }, [user]);

  return (
    <div>
      {!loaded ?
        <div>Loading...</div> :
        <Editor initialDtask={restoredTask} />
      }
    </div>
  );
};
