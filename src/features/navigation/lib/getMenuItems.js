import { MENU_ICONS_BY_ROUTE } from '../constants';

export const getMenuItems = (routes, routeKey) => {
  const route = routes[routeKey];

  if (!route.protected || !route.visible) {
    return null;
  }

  const { path, children, label } = routes[routeKey];

  return {
    key: path,
    label: label,
    icon: MENU_ICONS_BY_ROUTE[path],
    children:
      children &&
      Object.keys(children).map((childrenRouteKey) => getMenuItems(children, childrenRouteKey)),
  };
};
