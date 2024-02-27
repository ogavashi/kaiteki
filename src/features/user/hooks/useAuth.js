import { useEffect } from 'react';
import { useUserStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@features/navigation';

export function useAuth() {
  const { token, user } = useUserStore((state) => state);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token && !user) {
      navigate(ROUTES.LOGIN.path);
    }
  }, [navigate, token, user]);
}
