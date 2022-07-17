import type { StoreType } from '../typings/store';
import create from 'zustand';

const useStore = create<StoreType>((set) => ({
  fbuser: 'pending',
  setFBUser: () => set((state) => ({ fbuser: state.fbuser })),
  clearFBUser: () => set((state) => ({ fbuser: null })),

  pendingRedirect: null,
  setPendingRedirect: (path) => set((state) => ({ pendingRedirect: path })),
  clearPendingRedirect: () => set((state) => ({ pendingRedirect: null })),

  user: 'pending',
  setUser: (user) => set((state) => ({ user: user })),
  clearUser: () => set((state) => ({ user: null })),
}));

export default useStore;
