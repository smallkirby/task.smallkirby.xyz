import useStore from '../store';
import LoginBox from '../components/login/LoginBox';
import { useEffect } from 'react';
import { useNavigate } from '@remix-run/react';
import PageWrapper from 'components/common/PageWrapper';

export default function Login() {
  const { user, pendingRedirect, clearPendingRedirect } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) {
      const toPath = pendingRedirect ?? '/';
      clearPendingRedirect();
      navigate(toPath);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate, clearPendingRedirect]);

  return (
    <PageWrapper>
      {user === null ?
        <LoginBox /> :
        null
      }
    </PageWrapper>
  );
};
