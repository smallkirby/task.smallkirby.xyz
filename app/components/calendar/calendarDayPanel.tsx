import type { DayTask } from 'typings/task';
import { useEffect, useState } from 'react';

export default function CalendarDayPanel({ task }: {task: DayTask | null}) {
  const [doneRatio, setDoneRatio] = useState<number>(0);

  useEffect(() => {
    if (!task) return;
    const doneTasksLen = task.tasks.filter((t) => t.done).length;
    setDoneRatio(doneTasksLen / task.tasks.length);
  }, [task]);

  return (
    <div>
      {task === null ?
        <p>-</p> :
        <div className='pt-2'>
          {(doneRatio * 100).toFixed(0)} %
        </div>
      }
    </div>
  );
};
