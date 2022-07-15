import type { DayTask } from 'typings/task';
import TaskCompletionBar from './taskCompletionBar';
import { useState, useEffect } from 'react';

export default function ProgressPanel({ dtask }: {dtask: DayTask}) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0.0);

  const formatProgress = (progress: number) => (
    (progress * 100.0).toFixed(1)
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
      <div className='text-2xl'>Progress</div>
      {loaded ?
        <div>
          <div className='ml-2 text-base'>
            Completed <span className='text-skred'>{formatProgress(progress)}%</span> of tasks
          </div>
          <div className='h-32'>
            <TaskCompletionBar dtask={dtask} />
          </div>
        </div>:
        <div>
          Loading...
        </div>
      }
    </div>
  );
}
