import { Timestamp } from 'firebase/firestore';

export const timestamp2date = <T>(data: T, keys: string[]): T => {
  return Object.fromEntries(Object.entries(data).map(([key, value]) => [
    key,
    !(keys.includes(key)) ? value :
      value instanceof Date ? value :
        value instanceof Timestamp ? value.toDate() :
          value,
  ])) as unknown as T;
};
