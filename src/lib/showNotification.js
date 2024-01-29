import { notification } from 'antd';

export const showNotification = ({ type = 'success', message, description, duration }) => {
  notification[type]({
    ...(message ? { message } : type),
    ...(description ? { description } : type),
    ...(duration ? { duration } : type),
  });
};
