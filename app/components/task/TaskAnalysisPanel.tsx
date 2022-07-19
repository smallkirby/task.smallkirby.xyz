import type { DayTask, Task } from 'typings/task';
import TaskList from './taskList';
import ProgressPanel from './progressPanel';

export default function TaskAnalysisPane({ dtask, onTaskClick = null }: {
dtask: DayTask | null, onTaskClick?: ((task: Task) => void) | null
}) {
  return (
    <div className='rounded-md py-2 drop-shadow-2xl w-full'>
      <div className='w-full flex flex-col md:flex-row'>
        <div className='text-2xl md:border-b-0 md:w-1/2 w-full bg-skblack-dark
          mb-2 md:mb-0 md:mr-1 p-4 md:p-8 rounded-xl drop-shadow-2xl'>
          {dtask !== null ?
            <TaskList dtask={dtask} onTaskClick={onTaskClick} /> :
            <div className='text-skblack-light text-sm'>(task not selected)</div>
          }
        </div>
        <div className='text-2xl md:w-1/2 w-full bg-skblack-dark md:ml-1 p-4 md:p-8 rounded-xl drop-shadow-2xl'>
          {dtask !== null ?
            <ProgressPanel dtask={dtask} /> :
            <div className='text-skblack-light text-sm'>(task not selected)</div>
          }
        </div>
      </div>
    </div>
  );
};
