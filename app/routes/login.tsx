import useStore from '../store';
import LoginBox from '../components/login/LoginBox';
import { useEffect } from 'react';
import { useNavigate } from '@remix-run/react';

export default function Login() {
  const { user, pendingRedirect, clearPendingRedirect } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) {
      const toPath = pendingRedirect || '/';
      clearPendingRedirect();
      navigate(toPath);
    }
  }, [user, pendingRedirect, navigate, clearPendingRedirect]);

  return (
    <div>
      {user === null ?
        <LoginBox /> :
        null
      }
    </div>
  );
};
