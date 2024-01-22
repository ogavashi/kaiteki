/* eslint-disable react-hooks/exhaustive-deps */
import { Menu } from 'antd';
import { ROUTES, getMenuItems, getOpenKeys } from '@features/navigation';
import { memo, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const CustomMenu = memo(() => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const menuItems = useMemo(
    () =>
      Object.keys(ROUTES)
        .map((route) => getMenuItems(ROUTES, route))
        .filter(Boolean),
    []
  );

  const openedKeys = useMemo(() => getOpenKeys(pathname), [pathname]);

  const handleNavigate = useCallback(({ key }) => {
    navigate(key, { replace: true });
  }, []);

  return (
    <Menu
      onClick={handleNavigate}
      theme='dark'
      mode='inline'
      selectedKeys={[pathname]}
      defaultOpenKeys={openedKeys}
      items={menuItems}
    />
  );
});

CustomMenu.displayName = 'CustomMenu';
