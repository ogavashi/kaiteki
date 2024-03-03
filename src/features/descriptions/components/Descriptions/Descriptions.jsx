import PropTypes from 'prop-types';
import { Descriptions as ADescriptions, Button, Spin } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { WithNotification } from '@features/notification';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { findParentRoute } from '@features/navigation';

export const Descriptions = WithNotification(({ api, normalizer, notify, title }) => {
  const { id } = useParams();
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const goBack = useCallback(() => {
    const target = findParentRoute(pathname);

    if (target) {
      navigate(target.path);
    }
  }, [navigate, pathname]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const newData = await api?.({ id });
      const normalized = normalizer(newData);
      setData(normalized);
    } catch (error) {
      notify({
        type: 'error',
        message: 'Помилка!',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }, [api, id, normalizer, notify]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      <div>
        <Button onClick={goBack}>Назад</Button>
      </div>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '4rem',
          }}
        >
          <Spin />
        </div>
      ) : (
        <ADescriptions bordered title={title} layout='vertical' items={data} />
      )}
    </div>
  );
});

Descriptions.propTypes = {
  title: PropTypes.string,
  api: PropTypes.func.isRequired,
  normalizer: PropTypes.func.isRequired,
};
