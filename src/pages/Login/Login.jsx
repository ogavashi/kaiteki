import { LOADING_STATES } from '@constants/loadingStates';
import { validate } from '@features/error';
import { LoginForm, loginSchema } from '@features/login';
import { WithNotification } from '@features/notification';
import { useUserStore } from '@features/user';
import { useCallback, useState } from 'react';

// eslint-disable-next-line react/prop-types
function Login({ notify }) {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const { login, loadingState } = useUserStore((state) => state);

  const handleChange = useCallback((name, value) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleLogin = useCallback(() => {
    setErrors({});
    const validationErrors = validate(loginSchema, data);

    if (validationErrors) {
      setErrors(validationErrors);

      return;
    }

    login(data, notify);
  }, [data, login, notify]);

  return (
    <LoginForm
      handleLogin={handleLogin}
      handleChange={handleChange}
      data={data}
      errors={errors}
      isLoading={loadingState === LOADING_STATES.LOADING}
    />
  );
}

export const LoginWithNotification = WithNotification(Login);
