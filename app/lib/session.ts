import { getProjectAuth } from './firebase';
import useStore from '~/store';

export const watchUserLoginState = (): void => {
  const auth = getProjectAuth();
  if (auth === null) {
    console.error('Failed to get project auth.');
    return;
  }

  auth.onAuthStateChanged((user) => {
    if (user) {
      useStore.setState({ user });
    } else {
      useStore.setState({ user: null });
    }
  });
};
