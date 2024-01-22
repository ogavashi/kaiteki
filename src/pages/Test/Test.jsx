import { ROUTES } from '@features/navigation';
import { Button } from 'antd';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function Test() {
  const navigate = useNavigate();

  const handleNew = useCallback(() => {
    navigate(ROUTES.ACTS.children.NEW_ACT.path);
  }, []);

  return (
    <div>
      <Button onClick={handleNew}>New</Button>
    </div>
  );
}
