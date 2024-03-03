import { ROUTES } from '../constants';

export const findParentRoute = (currentRoute, routes = ROUTES) => {
  for (const key in routes) {
    const route = routes[key];
    if (route) {
      if (route.path === currentRoute) {
        return route;
      }

      if (route.children) {
        const parentRoute = findParentRoute(currentRoute, route.children);

        if (parentRoute) {
          return route;
        }
      }

      const dynamicRouteRegex = new RegExp(`^${route.path.split('/:id')[0]}/\\d+$`);
      if (dynamicRouteRegex.test(currentRoute)) {
        return route;
      }
    }
  }

  return null;
};
