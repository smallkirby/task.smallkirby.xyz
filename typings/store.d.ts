import type { User } from 'firebase/auth';

export type StoreType = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;

  pendingRedirect: string | null;
  setPendingRedirect: (path: string) => void;
  clearPendingRedirect: () => void;
}
