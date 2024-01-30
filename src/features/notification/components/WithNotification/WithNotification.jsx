import { showNotification } from '@lib';
import { notification } from 'antd';

export const WithNotification = (WrappedComponent) => {
  const WithNotificationWrapper = (props) => {
    const [notify, contextHolder] = notification.useNotification();

    return (
      <>
        {contextHolder} <WrappedComponent notify={showNotification(notify)} {...props} />
      </>
    );
  };

  WithNotificationWrapper.displayName = `WithNotification(${getDisplayName(WrappedComponent)})`;

  return WithNotificationWrapper;
};

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};
