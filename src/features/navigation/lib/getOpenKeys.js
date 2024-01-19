export const getOpenKeys = (currentPath) => {
  const path = currentPath.substring(1, currentPath.lastIndexOf('/'));

  const pathNames = path.split('/');

  const openKeys = pathNames.reduce((prev, cur) => {
    const key = [prev.at(-1), cur].join('/');

    return [...prev, key];
  }, []);

  return openKeys;
};
