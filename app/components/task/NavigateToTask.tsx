import type { DayTask } from 'typings/task';

export default function NavigateToTask({ task }: {task: DayTask | null}) {
  return (
    <button
      className='bg-skblack-dark rounded-xl drop-shadow-2xl py-2 px-6 text-xl text-skwhite
      hover:bg-skblack-light border-2 border-skblack transition-all duration-500
      disabled:text-skblack-light disabled:hover:bg-skblack-dark'
      disabled={task === null}
      onClick={() => {
        window.open(`/task/${task?.day_id}`, '_blank');
      }}
    >
      Check this task
    </button>
  );
};
