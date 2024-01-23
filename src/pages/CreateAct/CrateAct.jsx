import { Button } from 'antd';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function CreateAct() {
  const navigate = useNavigate();

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div>
      <Button onClick={handleGoBack}>Назад</Button>
    </div>
  );
}
