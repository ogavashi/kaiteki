import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import PropTypes from 'prop-types';

export const ModalButton = ({ mode, handleOpenModal, isDisabled }) => {
  const buttonProps = {
    disabled: isDisabled,
    onClick: handleOpenModal,
  };

  switch (mode) {
    case 'delete':
      return (
        <Button danger {...buttonProps} type='primary' icon={<DeleteOutlined />}>
          Видалити
        </Button>
      );

    default:
      break;
  }
};

ModalButton.propTypes = {
  mode: PropTypes.string,
  handleOpenModal: PropTypes.func,
  isDisabled: PropTypes.bool,
};
