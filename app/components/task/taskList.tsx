import { compile2html } from 'lib/markdown';
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
      <div className='text-2xl mb-2'>Tasks</div>
      {loaded ?
        <div className='ml-2'>
          {dtask.tasks.length !== 0 ?
            <div
              className='text-sm'
              dangerouslySetInnerHTML={{
                __html: compile2html(dtask.tasks.map((t) => (t.done ? '- [x] ' : '- [ ] ') + t.taskname).join('\n')),
              }}>
            </div>:
            <div className='pt-2 text-skblack-light text-lg'>
              (No tasks registered)
            </div>
          }
        </div> :
        <div>
          Loading...
        </div>
      }
    </div>
  );
}
