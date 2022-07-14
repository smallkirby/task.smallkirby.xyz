import yaml from 'js-yaml';
import type { DayID } from '../typings/task';

export type NoteCahe = {
  rawMd: string,
  dayId: DayID,
  savedAt: Date,
};

const getNoteKey = (dayId: DayID) => {
  return `notes/${dayId}`;
};

export const setNoteCache = (rawMd: string, dayId: DayID) => {
  const noteCache: NoteCahe = {
    rawMd,
    dayId,
    savedAt: new Date(),
  };
  localStorage.setItem(getNoteKey(dayId), yaml.dump(noteCache));
};

export const getNoteCache = (dayId: DayID): NoteCahe | null => {
  const value = localStorage.getItem(getNoteKey(dayId));
  if (value === null || value.length === 0) {
    return null;
  }
  const restoredValue = yaml.load(value);
  if (restoredValue === undefined || restoredValue === undefined) {
    return null;
  }
  return restoredValue as NoteCahe;
};

export const removeNoteCache = (dayId: DayID) => {
  localStorage.removeItem(getNoteKey(dayId));
};
