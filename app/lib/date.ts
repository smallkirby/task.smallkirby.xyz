import { Timestamp } from 'firebase/firestore';
import type { DayID, DayTask } from 'typings/task';
import { DateTime } from 'luxon';
import { DAYID_FORMAT } from './task';

export const timestamp2date = <T>(data: T, keys: string[]): T => {
  return Object.fromEntries(Object.entries(data).map(([key, value]) => [
    key,
    !(keys.includes(key)) ? value :
      value instanceof Date ? value :
        value instanceof Timestamp ? value.toDate() :
          value,
  ])) as unknown as T;
};

export const firstdayInMonth = (dayId: DayID): Date => {
  const [year, month] = dayId.split('-').map((s) => parseInt(s));
  const day = new Date(year, month - 1, 1);
  return day;
};

export const firstdayNextMonty = (dayId: DayID): Date => {
  const [year, month] = dayId.split('-').map((s) => parseInt(s));
  const day = new Date(year, month % 12, 1);
  return day;
};

export const date2dayid = (date: Date): DayID => (
  DateTime.fromJSDate(date).toFormat(DAYID_FORMAT)
);

export const dayid2date = (dayId: DayID): Date => {
  const [year, month, day] = dayId.split('-').map((s) => parseInt(s));
  return new Date(year, month - 1, day);
};

export const taskOfDay = (tasks: DayTask[], date: Date): DayTask | null => {
  const dayid = date2dayid(date);
  return tasks.find((task) => task.day_id === dayid) || null;
};
