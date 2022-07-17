import { DEFAULT_DTASK, fetchTodaysTask } from 'lib/task';
import { useEffect, useState } from 'react';
import type { DayTask } from 'typings/task';
import Editor from 'components/editor/Editor';
import useStore from 'store';
import { useNavigate } from '@remix-run/react';
import Loading from 'components/common/Loading';

export default function Today() {
  const [restoredTask, setRestoredTask] = useState<DayTask | null>(null);
  const navigate = useNavigate();
  const { user, setPendingRedirect } = useStore();

  useEffect(() => {
    (async () => {
      if (user === 'pending') return;
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
      } else {
        setPendingRedirect('/today');
        navigate('/login');
      }
    })();
  }, [user, navigate, setPendingRedirect]);

  return (
    <div>
      {restoredTask === null ?
        <Loading /> :
        <Editor initialDtask={restoredTask} />
      }
    </div>
  );
};
