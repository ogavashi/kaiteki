import { validate } from '@features/error';
import { LoginForm, loginSchema } from '@features/login';
import { WithNotification } from '@features/notification';
import { useUserStore } from '@features/user';
import { ApiService } from '@services';
import { useCallback, useState } from 'react';

// eslint-disable-next-line react/prop-types
function Login({ notify }) {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useUserStore();

  const handleChange = useCallback((name, value) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const performLogin = useCallback(
    async (payload) => {
      try {
        setIsLoading(true);
        const { user, token } = await ApiService.user.login(payload);
        login(user, token);
      } catch (error) {
        if (error?.serverValidation) {
          setErrors(error.serverValidation);

          return;
        }
        notify({
          type: 'error',
          message: 'Помилка!',
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [login, notify]
  );

  const handleLogin = useCallback(async () => {
    setErrors({});
    const validationErrors = validate(loginSchema, data);

    if (validationErrors) {
      setErrors(validationErrors);

      return;
    }

    await performLogin(data);
  }, [data, performLogin]);

  return (
    <LoginForm
      handleLogin={handleLogin}
      handleChange={handleChange}
      data={data}
      errors={errors}
      isLoading={isLoading}
    />
  );
}

export const LoginWithNotification = WithNotification(Login);
