import { useCallback } from 'react';
import { Button, Form } from 'antd';
import PropTypes from 'prop-types';
import { Inputs } from '@components';

export function LoginForm({ handleLogin, isLoading, errors, data, handleChange }) {
  const handleSubmit = useCallback(
    (values) => {
      handleLogin(values);
    },
    [handleLogin]
  );

  return (
    <Form
      requiredMark={false}
      layout='vertical'
      onFinish={handleSubmit}
      autoComplete='off'
      style={{ width: '15rem' }}
    >
      <Form.Item label='Пошта'>
        <Inputs.Input
          id={'email'}
          data={data}
          placeholder='Пошта'
          onChange={handleChange}
          errors={errors}
        />
      </Form.Item>
      <Form.Item label='Пароль'>
        <Inputs.Input
          id={'password'}
          data={data}
          placeholder='Пароль'
          onChange={handleChange}
          errors={errors}
          fieldProps={{ type: 'password' }}
        />
      </Form.Item>
      <Form.Item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Логін
        </Button>
      </Form.Item>
    </Form>
  );
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};
