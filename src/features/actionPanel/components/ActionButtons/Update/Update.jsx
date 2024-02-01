import { useCallback, useMemo } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

export function Update({ selectedRows, destination }) {
  const navigate = useNavigate();

  const isDisabled = useMemo(() => selectedRows.length !== 1, [selectedRows]);

  const handleClick = useCallback(() => {
    const path = generatePath(destination, { id: selectedRows[0] });
    navigate(path);
  }, [destination, navigate, selectedRows]);

  return (
    <Button onClick={handleClick} type='dashed' disabled={isDisabled} icon={<EditOutlined />}>
      Оновити
    </Button>
  );
}

Update.propTypes = {
  destination: PropTypes.string,
  selectedRows: PropTypes.arrayOf(PropTypes.number),
};
