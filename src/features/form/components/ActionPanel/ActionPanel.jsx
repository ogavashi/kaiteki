import { validate } from '@features/error';
import { WithNotification } from '@features/notification';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const ActionPanel = WithNotification(
  ({ data, notify, isLoading, setIsLoading, api, validationSchema, setErrors }) => {
    const navigate = useNavigate();

    const handleGoBack = useCallback(() => {
      navigate(-1);
    }, [navigate]);

    const handleSubmit = useCallback(async () => {
      setErrors({});
      setIsLoading(true);
      try {
        if (validationSchema) {
          const validationErrors = validate(validationSchema, data);

          if (validationErrors) {
            setErrors(validationErrors);

            return;
          }
        }

        await api(data);

        handleGoBack();
      } catch (error) {
        notify({
          type: 'error',
          message: 'Помилка!',
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    }, [api, data, handleGoBack, notify, setErrors, setIsLoading, validationSchema]);

    return (
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button onClick={handleGoBack} disabled={isLoading}>
          Назад
        </Button>
        <Button type='primary' onClick={handleSubmit} loading={isLoading}>
          Зберегти
        </Button>
      </div>
    );
  }
);

ActionPanel.propTypes = {
  isLoading: PropTypes.bool,
  handlePrimary: PropTypes.func,
  data: PropTypes.object,
  setIsLoading: PropTypes.func,
  validationSchema: PropTypes.object,
  api: PropTypes.func,
  setErrors: PropTypes.func,
};
