/* eslint-disable react-hooks/exhaustive-deps */
import { Menu } from 'antd';
import { ROUTES, getMenuItems, getOpenKeys, getSelectedKey } from '@features/navigation';
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

  const selectedKey = useMemo(() => getSelectedKey(ROUTES, pathname), [pathname]);

  return (
    <Menu
      onClick={handleNavigate}
      theme='dark'
      mode='inline'
      selectedKeys={[selectedKey]}
      defaultOpenKeys={openedKeys}
      items={menuItems}
    />
  );
});

CustomMenu.displayName = 'CustomMenu';
