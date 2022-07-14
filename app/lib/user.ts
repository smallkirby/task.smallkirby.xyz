import type { User, UID } from '../typings/user';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getProjectFirestore } from '../lib/firebase';

export type UserErrorType =
  | 'USER_NOT_FOUND'
  | 'USER_ALREADY_EXISTS'
  | 'OPERATION_FAILED'
;

export class UserError extends Error {
  reason: UserErrorType;

  constructor(reason: UserErrorType, message: string = '') {
    super(`${reason}: ${message}`);
    this.name = 'UserError';
    this.reason = reason;
  }
}

export const registerUser = async (uid: UID) => {
  const db = getProjectFirestore();
  const userDocRef = doc(db, 'users', uid);
  const userDocSnap = await getDoc(userDocRef);
  if (userDocSnap.exists()) {
    throw new UserError('USER_ALREADY_EXISTS');
  } else {
    await setDoc(userDocRef, {
      uid,
    }).catch((e) => {
      throw new UserError('OPERATION_FAILED', e.message);
    });
  }
};

export const fetchUser = async (uid: UID): Promise<User> => {
  const db = getProjectFirestore();
  const userDocRef = doc(db, 'users', uid);
  const userDocSnap = await getDoc(userDocRef);
  if (!userDocSnap.exists()) {
    throw new UserError('USER_NOT_FOUND');
  } else {
    return userDocSnap.data() as User;
  }
};
