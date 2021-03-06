import type { DayTask } from 'typings/task';
import TaskCompletionBar from './taskCompletionBar';
import { useState, useEffect } from 'react';

export default function ProgressPanel({ dtask }: {dtask: DayTask}) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0.0);

  const formatProgress = (progress: number) => (
    isNaN(progress) ? '0' : (progress * 100).toFixed(1)
  );

  useEffect(() => {
    const completedTasks = dtask.tasks.filter((task) => task.done);
    setProgress(completedTasks.length / dtask.tasks.length);
  }, [dtask]);

  useEffect(() => {
    if (dtask) {
      setLoaded(true);
    }
  }, [dtask]);

  return (
    <div className='rounded-md drop-shadow-2xl w-full'>
      <div className='text-2xl pb-4'>Progress</div>
      {loaded ?
        <div>
          <div className='ml-2 text-base'>
            Completed <span className={`${dtask.tasks.length === 0 ? 'text-skred-dark' : 'text-skred'}`}>
              {formatProgress(progress)}%</span> of tasks
          </div>
          {dtask.tasks.length !== 0 &&
            <div className='h-32'>
              <TaskCompletionBar dtask={dtask} />
            </div>
          }
        </div>:
        <div>
          Loading...
        </div>
      }
    </div>
  );
}
