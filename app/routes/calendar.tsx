import { useEffect, useState } from 'react';
import useStore from 'store';
import { useNavigate } from '@remix-run/react';
import type { DayID, DayTask } from 'typings/task';
import { fetchTasksSameMonth, todaysDayID } from 'lib/task';
import TaskCalendar from 'components/calendar/TaskCalendar';
import { date2dayid, dayid2date } from 'lib/date';
import type { TaskCalendarCallbacks } from 'components/calendar/TaskCalendar';
import TaskAnalysisPane from 'components/task/TaskAnalysisPanel';

export default function Calendar() {
  const navigate = useNavigate();
  const { user, setPendingRedirect } = useStore();
  const [dayid, setDayId] = useState<DayID>(todaysDayID()); // zero-origin
  const [month, setMonth] = useState<number>(dayid2date(dayid).getMonth());
  const [dtasks, setDtasks] = useState<DayTask[]>([]);

  const callbacks: TaskCalendarCallbacks = {
    onMonthRangeChange: (date: Date): void => {
      (async () => {
        const uid = user?.uid;
        if (!uid) return;
        setDtasks(await fetchTasksSameMonth(uid, date2dayid(date)));
        setMonth(date.getMonth());
      })();
    },
    onSelectedDateChange: (date: Date): void => {
      setDayId(date2dayid(date));
    },
  };

  useEffect(() => {
    if (user === null) {
      setPendingRedirect('/calendar');
      navigate('/login');
    }
  }, [user, navigate, setPendingRedirect]);

  useEffect(() => {
    (async () => {
      const uid = user?.uid;
      if (!uid) return;
      const fetchedTasks = await fetchTasksSameMonth(uid, dayid);
      setDtasks(fetchedTasks);
    })();
  }, [user, dayid]);

  return (
    <div>
      <div>
        <TaskCalendar month={month} tasks={dtasks} callbacks={callbacks} />
      </div>
      <div>
        <TaskAnalysisPane dtask={dtasks ? dtasks.find((t) => t.day_id === dayid) ?? null : null}/>
      </div>
    </div>
  );
};
