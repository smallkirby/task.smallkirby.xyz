import type { User as FBUser } from 'firebase/auth';
import type { User } from './user';

export type StoreType = {
  fbuser: FBUser | null | 'pending';
  setFBUser: (user: FBUser) => void;
  clearFBUser: () => void;

  pendingRedirect: string | null;
  setPendingRedirect: (path: string) => void;
  clearPendingRedirect: () => void;

  user: User | null | 'pending';
  setUser: (user: FBUser) => void;
  clearUser: () => void;
}
