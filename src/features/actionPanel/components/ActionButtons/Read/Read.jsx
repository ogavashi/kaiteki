import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

export function Read({ selectedRows, destination }) {
  const navigate = useNavigate();

  const isDisabled = useMemo(() => selectedRows.length !== 1, [selectedRows]);

  const handleClick = useCallback(() => {
    const path = generatePath(destination, { id: selectedRows[0] });
    navigate(path);
  }, [destination, navigate, selectedRows]);

  return (
    <Button onClick={handleClick} type='default' disabled={isDisabled}>
      Переглянути
    </Button>
  );
}

Read.propTypes = {
  destination: PropTypes.string,
  selectedRows: PropTypes.arrayOf(PropTypes.number),
  type: PropTypes.string,
  mode: PropTypes.string,
  api: PropTypes.func,
  handleRefresh: PropTypes.func,
};
