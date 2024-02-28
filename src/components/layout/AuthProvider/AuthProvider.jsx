/* eslint-disable react-hooks/exhaustive-deps */
import { LOADING_STATES } from '@constants/loadingStates';
import { useUserStore } from '@features/user';
import { Spin } from 'antd';
import { useEffect } from 'react';

import { Outlet } from 'react-router-dom';

export const AuthProvider = () => {
  const { loadingState, token, getMe } = useUserStore((state) => state);

  useEffect(() => {
    if (token) {
      getMe();
    }
  }, []);

  if (loadingState === LOADING_STATES.LOADING) {
    return (
      <div>
        <Spin size='large' style={{ position: 'absolute', top: '50%', right: 0, left: 0 }} />
      </div>
    );
  }

  return <Outlet />;
};
