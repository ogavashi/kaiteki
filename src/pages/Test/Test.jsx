import { PAGE_KEYS } from '@constants';
import { ROUTES } from '@features/navigation';
import { ApiService } from '@services';
import { Button } from 'antd';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function Test() {
  const navigate = useNavigate();

  const handleNew = useCallback(() => {
    navigate(ROUTES.ACTS.children.NEW_ACT.path);
  }, [navigate]);

  const testApi = useCallback(async () => {
    const test = await ApiService[PAGE_KEYS.TEST].read();

    console.log(test);
  }, []);

  return (
    <div>
      <Button onClick={handleNew}>Створити</Button>
      <Button onClick={testApi}>Test API</Button>
    </div>
  );
}
