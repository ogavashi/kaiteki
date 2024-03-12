import { validate } from '@features/error';
import { findParentRoute } from '@features/navigation';
import { WithNotification } from '@features/notification';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const ActionPanel = WithNotification(
  ({
    data,
    notify,
    isLoading,
    setIsLoading,
    api,
    validationSchema,
    setErrors,
    isFetching,
    apiNormalizer,
  }) => {
    const navigate = useNavigate();
    const { pathname } = location;

    const handleGoBack = useCallback(() => {
      const target = findParentRoute(pathname);

      if (target) {
        navigate(target.path);
      }
    }, [navigate, pathname]);

    const handleSubmit = useCallback(async () => {
      setErrors({});
      setIsLoading(true);
      try {
        const normalized = apiNormalizer?.(data) || data;

        if (validationSchema) {
          const validationErrors = validate(validationSchema, normalized);

          if (validationErrors) {
            setErrors(validationErrors);

            return;
          }
        }

        await api(normalized);

        handleGoBack();
      } catch (error) {
        const serverErrors = error?.serverValidation;

        if (serverErrors) {
          setErrors(serverErrors);
        }
        notify({
          type: 'error',
          message: 'Помилка!',
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    }, [api, apiNormalizer, data, handleGoBack, notify, setErrors, setIsLoading, validationSchema]);

    return (
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button onClick={handleGoBack} disabled={isLoading || isFetching}>
          Назад
        </Button>
        <Button
          type='primary'
          onClick={handleSubmit}
          loading={isLoading}
          disabled={isFetching || (!data && !isFetching)}
        >
          Зберегти
        </Button>
      </div>
    );
  }
);

ActionPanel.propTypes = {
  isLoading: PropTypes.bool,
  isFetching: PropTypes.bool,
  handlePrimary: PropTypes.func,
  data: PropTypes.object,
  setIsLoading: PropTypes.func,
  validationSchema: PropTypes.object,
  api: PropTypes.func,
  setErrors: PropTypes.func,
  apiNormalizer: PropTypes.func,
};
