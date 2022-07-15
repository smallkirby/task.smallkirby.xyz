import type { DayID, DayTask } from 'typings/task';

const dayid2printable = (dayid: DayID) => (
  dayid.split('-').join('.')
);

export default function TaskClock({ dtask }: {dtask: DayTask}) {
  return (
    <div className='h-full my-auto py-auto text-center'>
      <p className='text-xl pt-2'>{dayid2printable(dtask.day_id)}</p>
    </div>
  );
};
