import type { UID } from './user';

export type DayID = string;

export type Task = {
  taskname: string,
  done: boolean,
}

export type DayTask = {
  day_id: DayID,
  note_md: string,
  tasks: Task[],
  owner: UID | null,
  createdAt: Date,
  updatedAt: Date,
};
