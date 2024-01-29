import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { Modal } from '../Modal';
import { ModalButton } from '../ModalButton';

export const ModalWrapper = ({ mode, api, isDisabled, handleRefresh }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <>
      <ModalButton mode={mode} handleOpenModal={handleOpenModal} isDisabled={isDisabled} />
      <Modal
        isOpen={isOpen}
        handleClose={handleCloseModal}
        mode={mode}
        api={api}
        handleRefresh={handleRefresh}
      />
    </>
  );
};

ModalWrapper.propTypes = {
  mode: PropTypes.string,
  api: PropTypes.func,
  isDisabled: PropTypes.bool,
  handleRefresh: PropTypes.func,
};
