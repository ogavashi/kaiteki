import React from 'react';
import { HomeOutlined, CarOutlined, UserOutlined } from '@ant-design/icons';
import { ROUTES } from './routes';

export const MENU_ICONS_BY_ROUTE = {
  [ROUTES.HOME.path]: React.createElement(HomeOutlined, null),
  [ROUTES.VEHICLES.path]: React.createElement(CarOutlined, null),
  [ROUTES.DRIVERS.path]: React.createElement(UserOutlined, null),
};
