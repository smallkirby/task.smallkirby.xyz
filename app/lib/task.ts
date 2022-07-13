import type { Task } from '../typings/task';
import { DateTime } from 'luxon';

const DAYID_FORMAT = 'yyyy-MM-dd';

/*
  Convert raw markdown string into Task list.

  NOTE: this func keeps the order of tasks.
*/
export const rawmd2tasks = (rawmd: string): Task[] => {
  const lines = rawmd.split('\n').map((line) => (
    line.trim()
  ));
  const tasks: Task[] = [];

  for (const line of lines) {
    if (line.startsWith('- [x] ')) {
      tasks.push({ taskname: line.split('- [x] ')[1], done: true });
    } else if (line.startsWith('- [ ] ')) {
      tasks.push({ taskname: line.split('- [ ] ')[1], done: false });
    }
  }
  return tasks;
};

export const todaysDayID = (): string => (
  DateTime.local().toFormat(DAYID_FORMAT)
);
