export const getSelectedKey = (routes, pathname, isFirst = true) => {
  for (const key in routes) {
    const route = routes[key];

    if (helperCheck(route.path, pathname)) {
      return isFirst ? route.path : route;
    }

    if (route.children) {
      const childRoute = getSelectedKey(route.children, pathname, false);

      if (childRoute) {
        return childRoute.visible ? childRoute.path : route.path;
      }
    }
  }

  return null;
};

const helperCheck = (lhs, rhs) => {
  let routePath = lhs;
  let pathName = rhs;

  if (lhs.includes(':')) {
    routePath = lhs.slice(0, rhs.lastIndexOf('/'));
    pathName = rhs.slice(0, rhs.lastIndexOf('/'));
  }

  return routePath === pathName;
};
