import type { StoreType } from '../../typings/store';
import create from 'zustand';

const useStore = create<StoreType>((set) => ({
  user: null,
  setUser: () => set((state) => ({ user: state.user })),
  clearUser: () => set((state) => ({ user: null })),

  pendingRedirect: null,
  setPendingRedirect: (path) => set((state) => ({ pendingRedirect: path })),
  clearPendingRedirect: () => set((state) => ({ pendingRedirect: null })),
}));

export default useStore;
