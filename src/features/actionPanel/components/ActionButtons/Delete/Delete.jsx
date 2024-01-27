import PropTypes from 'prop-types';
import { Modal } from '@features/modal';
import { useMemo } from 'react';

export function Delete({ selectedRows, type, mode }) {
  const isDisabled = useMemo(() => !selectedRows.length, [selectedRows]);

  if (type === 'modal') {
    return <Modal mode={mode} isDisabled={isDisabled} />;
  }
  return null;
}

Delete.propTypes = {
  destination: PropTypes.string,
  selectedRows: PropTypes.arrayOf(PropTypes.number),
  type: PropTypes.string,
  mode: PropTypes.string,
};
