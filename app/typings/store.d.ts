import type { User as FBUser } from 'firebase/auth';
import type { User } from './user';

export type StoreType = {
  fbuser: FBUser | null;
  setFBUser: (user: FBUser) => void;
  clearFBUser: () => void;

  pendingRedirect: string | null;
  setPendingRedirect: (path: string) => void;
  clearPendingRedirect: () => void;

  user: User | null;
  setUser: (user: FBUser) => void;
  clearUser: () => void;
}
