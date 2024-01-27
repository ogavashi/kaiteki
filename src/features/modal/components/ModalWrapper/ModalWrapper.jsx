import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { Modal } from '../Modal';
import { Button } from 'antd';

export const ModalWrapper = ({ mode, api, isDisabled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <>
      <Button onClick={handleOpenModal} disabled={isDisabled}>
        Click
      </Button>
      <Modal isOpen={isOpen} handleClose={handleCloseModal} mode={mode} api={api} />
    </>
  );
};

ModalWrapper.propTypes = {
  mode: PropTypes.string,
  api: PropTypes.func,
  isDisabled: PropTypes.bool,
};
