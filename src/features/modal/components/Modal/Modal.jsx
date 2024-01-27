import PropTypes from 'prop-types';
import { Modal as AntModal } from 'antd';

export const Modal = ({ isOpen, handleClose }) => {
  return (
    <AntModal open={isOpen} onCancel={handleClose}>
      <>Biba i boba</>
    </AntModal>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};
