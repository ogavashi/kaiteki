import React from 'react';
import { ContainerOutlined, HomeOutlined, PlusOutlined, CarOutlined } from '@ant-design/icons';
import { ROUTES } from './routes';

export const MENU_ICONS_BY_ROUTE = {
  [ROUTES.HOME.path]: React.createElement(HomeOutlined, null),
  [ROUTES.ACTS.path]: React.createElement(ContainerOutlined, null),
  [ROUTES.VEHICLES.path]: React.createElement(CarOutlined, null),
  [ROUTES.ACTS.children.NEW_ACT.path]: React.createElement(PlusOutlined, null),
};
