import type { DayTask } from 'typings/task';
import TaskList from './taskList';
import ProgressPanel from './progressPanel';

export default function TaskAnalysisPane({ dtask }: {dtask: DayTask}) {
  return (
    <div className='bg-skblack-dark rounded-md px-4 md:px-8 py-2 drop-shadow-2xl w-full'>
      <div className=' md:pt-2 w-full flex flex-col md:flex-row'>
        <div className='pb-2 pr-2 md:pr-4 border-b-2 md:border-b-0 md:border-r-2 border-skblack-light md:w-1/2 w-full'>
          <TaskList dtask={dtask} />
        </div>
        <div className='pt-2 pl-2 md:pl-4 text-2xl md:w-1/2 w-full'>
          <ProgressPanel dtask={dtask} />
        </div>
      </div>
    </div>
  );
};
