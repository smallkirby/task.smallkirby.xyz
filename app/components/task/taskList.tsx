import { Tooltip } from '@mui/material';
import { compile2html } from 'lib/markdown';
import { useEffect, useState } from 'react';
import type { DayTask, Task } from 'typings/task';

export default function TaskList({ dtask, onTaskClick = null }: {
  dtask: DayTask, onTaskClick?: ((task: Task) => void) | null
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (dtask) {
      setLoaded(true);
    }
  }, [dtask]);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const elm = e.target as HTMLLabelElement;
    const htmlFor = elm.htmlFor;
    if (!htmlFor || !htmlFor.startsWith('cbx_')) return;
    const index = parseInt(elm.htmlFor.split('cbx_')[1] || '-1', 10);
    if (index !== -1) {
      onTaskClick?.(dtask.tasks[index]);
    }
  };

  return (
    <div className='w-full flex-col'>
      {onTaskClick ?
        <Tooltip title='Click checkbox to complete a TODO'>
          <div className='text-2xl mb-2'>Tasks</div>
        </Tooltip> :
        <div className='text-2xl mb-2'>Tasks</div>
      }
      {loaded ?
        <div className='ml-2'>
          {dtask.tasks.length !== 0 ?
            <div
              className='text-sm'
              onClick={onClick}
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
