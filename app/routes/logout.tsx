import useStore from '../store';
import { useEffect } from 'react';
import { useNavigate } from '@remix-run/react';
import { getProjectAuth } from '~/lib/firebase';

export default function Logout() {
  const { clearUser, pendingRedirect, clearPendingRedirect } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    clearUser();
    getProjectAuth()?.signOut();
    const toPath = pendingRedirect || '/';
    clearPendingRedirect();
    navigate(toPath);
  }, [clearUser, pendingRedirect, navigate, clearPendingRedirect]);

  return null;
};
