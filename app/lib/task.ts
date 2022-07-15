import type { Task, DayTask } from '../typings/task';
import { DateTime } from 'luxon';
import { getProjectFirestore } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { UID } from 'typings/user';
import type { NoteCahe } from './localstorage';
import { serverTimestamp } from 'firebase/firestore';
import { timestamp2date } from './date';

export type DtaskErrorType =
  | 'OWNER_UNKNOWN'
  | 'OPERATION_FAILED'
;

const DAYID_FORMAT = 'yyyy-MM-dd';

export class DtaskError extends Error {
  reason: DtaskErrorType;

  constructor(reason: DtaskErrorType, message: string = '') {
    super(`${reason}: ${message}`);
    this.name = 'DtaskError';
    this.reason = reason;
  }
}

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

export const cachedOrNewer = (cached: NoteCahe, remote: DayTask): string => {
  if (cached.savedAt.getTime() > remote.updatedAt.getTime()) {
    console.log('Using local cache');
    return cached.rawMd;
  } else {
    console.log('Using remote cache');
    return remote.note_md;
  }
};

export const fetchTodaysTask = async (uid: UID): Promise<DayTask | null> => {
  const db = getProjectFirestore();
  const todaySTaskRef = doc(db, 'tasks', uid, 'tasks', todaysDayID());
  const userDocSnap = await getDoc(todaySTaskRef);

  if (!userDocSnap.exists()) {
    return null;
  } else {
    return timestamp2date(userDocSnap.data() as DayTask, ['updatedAt', 'createdAt']);
  }
};

export const pushTodaysTask = async (dtask: DayTask): Promise<Date> => {
  if (dtask.owner === null) {
    throw new DtaskError('OWNER_UNKNOWN');
  }
  const db = getProjectFirestore();
  const todaySTaskRef = doc(db, 'tasks', dtask.owner, 'tasks', dtask.day_id);
  const updatedAt = new Date();
  return await setDoc(todaySTaskRef, {
    ...dtask,
    updatedAt: serverTimestamp(),
  }).then(() => (updatedAt)).catch((e) => {
    throw new DtaskError('OPERATION_FAILED', e.message);
  });
};
