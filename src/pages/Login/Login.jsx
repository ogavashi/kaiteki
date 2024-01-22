import { LoginForm } from '@features/login';
import { useCallback, useState } from 'react';

export function Login() {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((name, value) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleLogin = useCallback(() => {
    console.log(data);
    setErrors({});
    // const validationErrors = validate(loginSchema, data);
  }, [data]);

  return (
    <LoginForm
      handleLogin={handleLogin}
      handleChange={handleChange}
      data={data}
      errors={errors}
      isLoading={false}
    />
  );
}
