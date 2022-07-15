import { useEffect } from 'react';
import type { DayTask } from 'typings/task';
import TaskList from './taskList';
import ProgressPanel from './progressPanel';

export default function TaskAnalysisPane({ dtask }: {dtask: DayTask}) {
  useEffect(() => {
    console.log(dtask);
  }, [dtask]);
  return (
    <div className='bg-skblack-dark rounded-md px-8 py-2 drop-shadow-2xl w-full'>
      <div className='pt-2 w-full flex'>
        <div className='pr-4 border-r-2 border-skblack-light w-1/2'>
          <TaskList dtask={dtask} />
        </div>
        <div className='pl-4 text-2xl w-1/2'>
          <ProgressPanel dtask={dtask} />
        </div>
      </div>
    </div>
  );
};
