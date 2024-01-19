import React from 'react';
import { ContainerOutlined, HomeOutlined } from '@ant-design/icons';
import { ROUTES } from './routes';

export const MENU_ICONS_BY_ROUTE = {
  [ROUTES.HOME.path]: React.createElement(HomeOutlined, null),
  [ROUTES.ACTS.path]: React.createElement(ContainerOutlined, null),
};
