export const getSelectedKey = (routes, pathname) => {
  for (const key in routes) {
    const route = routes[key];

    if (route.path === pathname) {
      return route.path;
    }

    if (route.children) {
      const childRoute = getSelectedKey(route.children, pathname);

      if (childRoute) {
        return childRoute.visible ? childRoute.path : route.path;
      }
    }
  }

  return null;
};
