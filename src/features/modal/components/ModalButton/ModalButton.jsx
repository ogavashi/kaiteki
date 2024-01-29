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
        <Button danger {...buttonProps} type='primary'>
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
