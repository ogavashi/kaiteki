import PropTypes from 'prop-types';
import { Modal as AntModal, Divider, Typography } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { WithNotification } from '@features/notification';

const okButtonTitles = {
  delete: 'Видалити',
  create: 'Додати',
  update: 'Оновити',
};

const modalTitles = {
  delete: 'Видалення запису',
  create: 'Створення запису',
  update: 'Оновлення запису',
};

export const Modal = WithNotification(
  ({ isOpen, handleClose, mode, api, handleRefresh, notify, selectedRows }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleCancel = useCallback(() => {
      handleClose();
    }, [handleClose]);

    const handleSubmit = useCallback(async () => {
      try {
        setIsLoading(true);

        mode === 'delete' ? api({ ids: selectedRows }) : await api();

        handleRefresh();
        handleClose();
        notify({
          type: 'success',
          message: 'Успіх!',
          description: 'Дію успішно виконано.',
        });
      } catch (error) {
        notify({
          type: 'error',
          message: 'Помилка!',
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    }, [api, handleClose, handleRefresh, mode, notify, selectedRows]);

    const okButtonProps = useMemo(
      () => ({
        danger: mode === 'delete',
      }),
      [mode]
    );

    return (
      <>
        <AntModal
          open={isOpen}
          onCancel={handleCancel}
          onOk={handleSubmit}
          okButtonProps={okButtonProps}
          okText={okButtonTitles[mode]}
          cancelText='Відмінити'
          title={modalTitles[mode]}
          centered
          confirmLoading={isLoading}
        >
          <Divider />
          {mode === 'delete' && (
            <Typography.Text strong>Ви впевнені, що хочете видалити запис?</Typography.Text>
          )}
          <Divider />
        </AntModal>
      </>
    );
  }
);

Modal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  mode: PropTypes.string,
  api: PropTypes.func,
  handleRefresh: PropTypes.func,
  selectedRows: PropTypes.arrayOf(PropTypes.string),
};
