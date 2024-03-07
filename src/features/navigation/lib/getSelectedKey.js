export const getSelectedKey = (routes, path) => {
  const segments = path.split('/').filter((segment) => segment !== '');
  const visiblePath = findVisiblePath(routes, segments);
  return visiblePath;
};

const findVisiblePath = (routes, segments) => {
  if (segments.length === 0) {
    const homeRoute = routes.HOME;
    return homeRoute && homeRoute.visible ? '/' : null;
  }

  const pathToMatch = `/${segments.join('/')}`;
  const route = findRoute(routes, pathToMatch);

  return route && route.visible ? route.path : findVisiblePath(routes, segments.slice(0, -1));
};

const findRoute = (routes, path) => {
  for (const key in routes) {
    const { path: routePath, children } = routes[key];
    if (routePath === path) return routes[key];
    if (children) {
      const childRoute = findRoute(children, path);
      if (childRoute) return childRoute;
    }
  }
  return null;
};
