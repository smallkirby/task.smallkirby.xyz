import type { OnChangeDateCallback } from 'react-calendar';
import { useState } from 'react';
import Calendar from 'react-calendar';
import CalendarDayPanel from './calendarDayPanel';
import type { DayTask } from 'typings/task';
import { taskOfDay } from 'lib/date';
import { DateTime } from 'luxon';

export interface TaskCalendarCallbacks {
  onMonthRangeChange: (date: Date) => void;
  onSelectedDateChange: (date: Date) => void;
}

export default function TaskCalendar({ month, tasks, callbacks }: {
  month: number, tasks: DayTask[], callbacks: TaskCalendarCallbacks
}) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const onChangeDateCallback: OnChangeDateCallback = (value: Date) => {
    setSelectedDate(value);
  };

  return (
    <div className='Sample__container'>
      <div className='Sample__container__content'>
        <Calendar
          onChange={onChangeDateCallback}
          value={selectedDate}
          calendarType='Hebrew'
          defaultView='month'
          view='month'
          tileDisabled={({ date }) => (date.getMonth() !== month)}
          showNeighboringMonth={false}
          tileContent={({ date, view }) => {
            return <CalendarDayPanel task={taskOfDay(tasks, date)}/>;
          }}
          showDoubleView={false}
          showNavigation={true}
          onActiveStartDateChange={(date) => {
            callbacks.onMonthRangeChange(date.activeStartDate);
          }}
          onClickDay={(date) => {
            callbacks.onSelectedDateChange(date);
          }}
          formatDay={(locale, date) => {
            return DateTime.fromJSDate(date).toFormat('dd');
          }}
        />
      </div>
    </div>
  );
};
