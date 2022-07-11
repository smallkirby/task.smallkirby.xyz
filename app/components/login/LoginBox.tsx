import { useEffect, useState } from 'react';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { getProjectAuth } from '~/lib/firebase';
import useStore from '../../store';

const provider = new GithubAuthProvider();

export default function LoginBox() {
  const { user } = useStore();
  const [isClient, setIsClient] = useState(false);

  const doLogin = async () => {
    const auth = getProjectAuth();
    if (auth === null) {
      console.error('Failed to get project auth.');
      return;
    }
    return await signInWithPopup(auth, provider);
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  return (
    <div>
      {isClient ?
        (
          <div>
            <div>{user ? user.displayName : 'null'}</div>
            <button onClick={doLogin}>Login</button>
          </div>
        ) : null}
    </div>
  );
};
