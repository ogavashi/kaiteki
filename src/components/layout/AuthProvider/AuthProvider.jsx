/* eslint-disable react-hooks/exhaustive-deps */
import { LOADING_STATES } from '@constants/loadingStates';
import { ROUTES } from '@features/navigation';
import { useUserStore } from '@features/user';
import { Spin } from 'antd';
import { useEffect } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

export const AuthProvider = () => {
  const { loadingState, token, user, getMe } = useUserStore((state) => state);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getMe();
    }
  }, []);

  useEffect(() => {
    if (!token || (!user && loadingState !== LOADING_STATES.LOADED)) {
      navigate(ROUTES.LOGIN.path);
    }
  }, [user, loadingState]);

  if (loadingState === LOADING_STATES.LOADING) {
    return (
      <div>
        <Spin size='large' style={{ position: 'absolute', top: '50%', right: 0, left: 0 }} />
      </div>
    );
  }

  return <Outlet />;
};
