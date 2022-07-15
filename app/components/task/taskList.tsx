import { useEffect, useState } from 'react';
import type { DayTask } from 'typings/task';

export default function TaskList({ dtask }: {dtask: DayTask}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (dtask) {
      setLoaded(true);
    }
  }, [dtask]);

  return (
    <div className='w-full flex-col'>
      <div className='text-2xl'>Tasks</div>
      {loaded ?
        <div className='ml-2'>
          <ul>
            {Array(dtask.tasks.length).fill(0).map((_, ix) => (
              <li key={ix} className='task-list-item'>
                <input type='checkbox'
                  disabled={true} id={`task-${dtask.day_id}-${ix}`} checked={dtask.tasks[ix].done} />
                <label htmlFor={`task-${dtask.day_id}-${ix}`}>
                  {dtask.tasks[ix].taskname}
                </label>
              </li>
            ))}
          </ul>
        </div> :
        <div>
          Loading...
        </div>
      }
    </div>
  );
}
