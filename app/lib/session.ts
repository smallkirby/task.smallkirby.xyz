import { getProjectAuth } from './firebase';
import { fetchUser, registerUser, UserError } from './user';
import type { UID } from '../typings/user';
import useStore from 'store';

const fetchOrCreateUser = async (uid: UID) => {
  try {
    return await fetchUser(uid);
  } catch (e) {
    if (e instanceof UserError && e.reason === 'USER_NOT_FOUND') {
      await registerUser(uid);
      return await fetchUser(uid);
    } else {
      throw e;
    }
  }
};

export const watchUserLoginState = (): void => {
  const auth = getProjectAuth();
  if (auth === null) {
    console.error('Failed to get project auth.');
    return;
  }

  auth.onAuthStateChanged(async (fbuser) => {
    if (fbuser) {
      useStore.setState({ fbuser });
      const user = await fetchOrCreateUser(fbuser.uid);
      useStore.setState({ user });
    } else {
      useStore.setState({ fbuser: null, user: null });
    }
  });
};
