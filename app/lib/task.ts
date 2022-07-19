import type { Task, DayTask, DayID } from '../typings/task';
import { DateTime } from 'luxon';
import { getProjectFirestore } from './firebase';
import { collection, doc, getDoc, getDocs, limit, query, setDoc, where, orderBy } from 'firebase/firestore';
import type { UID } from 'typings/user';
import type { NoteCahe } from './localstorage';
import { serverTimestamp } from 'firebase/firestore';
import { firstdayInMonth, firstdayNextMonty, timestamp2date } from './date';

export type DtaskErrorType =
  | 'OWNER_UNKNOWN'
  | 'OPERATION_FAILED'
;

export const DAYID_FORMAT = 'yyyy-MM-dd';

export const todaysDayID = (): DayID => (
  DateTime.local().toFormat(DAYID_FORMAT)
);

export const DEFAULT_DTASK = {
  note_md: '',
  day_id: todaysDayID(),
  owner: null,
  tasks: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};
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

export const updateSingleTask = (dtask: DayTask, task: Task): DayTask => {
  const lines = dtask.note_md.split('\n');
  const targetLineIndex = lines.findIndex((line) => {
    if (line.trim().startsWith('- [x] ') || line.trim().startsWith('- [ ] ')) {
      if (line.trim().substring(6) === task.taskname.trim()) {
        return true;
      }
    }
    return false;
  });

  if (targetLineIndex !== -1) {
    if (task.done) {
      lines[targetLineIndex] = `- [x] ${task.taskname}`;
    } else {
      lines[targetLineIndex] = `- [ ] ${task.taskname}`;
    }
  }
  dtask.note_md = lines.join('\n');
  dtask.tasks = rawmd2tasks(dtask.note_md);
  return dtask;
};

export const cachedOrNewer = (cached: NoteCahe, remote: DayTask): string => {
  if (cached.savedAt.getTime() > remote.updatedAt.getTime()) {
    console.log('Using local cache');
    return cached.rawMd;
  } else {
    console.log('Using remote cache');
    return remote.note_md;
  }
};

export const fetchTask = async (uid: UID, dayId: DayID): Promise<DayTask | null> => {
  const db = getProjectFirestore();
  const taskRef = doc(db, 'tasks', uid, 'tasks', dayId);
  const userDocSnap = await getDoc(taskRef);

  if (!userDocSnap.exists()) {
    return null;
  } else {
    return timestamp2date(userDocSnap.data() as DayTask, ['updatedAt', 'createdAt']);
  }
};

export const fetchTodaysTask = async (uid: UID): Promise<DayTask | null> => {
  return fetchTask(uid, todaysDayID());
};

// fetch latest task before today
export const fetchLatestTask = async (uid: UID): Promise<DayTask | null> => {
  const db = getProjectFirestore();
  const ref = collection(db, 'tasks', uid, 'tasks');
  const qry = query(ref,
    orderBy('createdAt', 'desc'),
    limit(2),
  );
  const tasksSnap = await getDocs(qry).then((snap) => snap).catch((err) => {
    throw new DtaskError('OPERATION_FAILED', err.message);
  });
  const tasks = tasksSnap.docs.map((doc) => timestamp2date(doc.data() as DayTask, ['updatedAt', 'createdAt']));
  switch (tasks.length) {
  case 1:
    return tasks[0];
  case 2:
    if (tasks[0].day_id === todaysDayID()) return tasks[1];
    else return tasks[0];
  default:
    return null;
  }
};

export const fetchTasksSameMonth = async (uid: UID, dayId: DayID): Promise<DayTask[]> => {
  const db = getProjectFirestore();
  const ref = collection(db, 'tasks', uid, 'tasks');
  const qry = query(ref,
    where('createdAt', '>=', firstdayInMonth(dayId)),
    where('createdAt', '<', firstdayNextMonty(dayId)),
  );

  const tasksSnap = await getDocs(qry).then((snap) => snap).catch((err) => {
    throw new DtaskError('OPERATION_FAILED', err.message);
  });

  return tasksSnap.docs.map((doc) => (
    timestamp2date(doc.data() as DayTask, ['updatedAt', 'createdAt'])
  ));
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
