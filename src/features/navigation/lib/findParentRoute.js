import { ROUTES } from '../constants';

export const findParentRoute = (currentRoute, routes = ROUTES, parent = null) => {
  for (const key in routes) {
    const route = routes[key];

    if (route) {
      if (route.path === currentRoute) {
        return parent; // Return the parent route
      }

      if (route.children) {
        const parentRoute = findParentRoute(currentRoute, route.children, route); // Pass the current route as parent
        if (parentRoute) {
          return parentRoute; // Return the parent route found in children
        }
      }

      const dynamicRouteRegex = new RegExp(`^${route.path.split('/:id')[0]}/\\w+$`);
      if (dynamicRouteRegex.test(currentRoute)) {
        return parent; // Return the parent route for dynamic routes
      }
    }
  }

  return null;
};
