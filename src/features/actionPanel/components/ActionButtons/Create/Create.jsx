import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export function Create({ destination }) {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(destination);
  }, [destination, navigate]);

  return (
    <Button onClick={handleClick} type='primary' icon={<PlusOutlined />}>
      Створити
    </Button>
  );
}

Create.propTypes = {
  destination: PropTypes.string,
};
