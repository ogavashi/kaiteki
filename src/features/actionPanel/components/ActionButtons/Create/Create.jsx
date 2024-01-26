import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'antd';

export function Create({ destination }) {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    console.log(destination);
    navigate(destination);
  }, [destination, navigate]);

  return (
    <Button onClick={handleClick} type='primary'>
      Створити
    </Button>
  );
}

Create.propTypes = {
  destination: PropTypes.string,
};
