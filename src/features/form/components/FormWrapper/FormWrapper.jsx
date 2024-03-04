import { useCallback, useEffect, useState } from 'react';
import { ActionPanel } from '../ActionPanel';
import { Form } from '../Form';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { WithNotification } from '@features/notification';
import { Empty, Spin } from 'antd';

export const FormWrapper = WithNotification(({ api, apiById, schema, formSchema, notify }) => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const handleChange = useCallback((name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const fetchData = useCallback(async () => {
    if (!id || !apiById) {
      return;
    }
    try {
      setIsFetching(true);
      const data = await apiById?.({ id });
      if (data) {
        setData(data);
      }
    } catch (error) {
      notify({
        type: 'error',
        message: 'Помилка!',
        description: error.message,
      });
    } finally {
      setIsFetching(false);
    }
  }, [apiById, id, notify]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const render = useCallback(() => {
    if (isFetching) {
      return <Spin />;
    }
    if (id && !Object.keys(data).length && !isFetching) {
      return <Empty />;
    }

    return (
      <Form
        formSchema={formSchema}
        data={data}
        handleChange={handleChange}
        isLoading={isLoading}
        errors={errors}
      />
    );
  }, [data, errors, formSchema, handleChange, id, isFetching, isLoading]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <ActionPanel
        isLoading={isLoading}
        isFetching={isFetching}
        setIsLoading={setIsLoading}
        data={data}
        api={api}
        setErrors={setErrors}
        validationSchema={schema}
      />
      {render()}
    </div>
  );
});

FormWrapper.propTypes = {
  api: PropTypes.func,
  apiById: PropTypes.func,
  schema: PropTypes.object,
  formSchema: PropTypes.arrayOf(PropTypes.shape({})),
};
