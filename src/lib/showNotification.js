export const showNotification =
  (notify) =>
  ({ type = 'success', message, description, duration }) => {
    notify[type]({
      ...(message ? { message } : type),
      ...(description ? { description } : type),
      ...(duration ? { duration } : type),
    });
  };
