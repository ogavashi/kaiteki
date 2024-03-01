import { useCallback, useState } from 'react';
import { ActionPanel } from '../ActionPanel';
import { Form } from '../Form';
import PropTypes from 'prop-types';

export const FormWrapper = ({ api, schema, formSchema }) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback((name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <ActionPanel
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        data={data}
        api={api}
        setErrors={setErrors}
        validationSchema={schema}
      />
      <Form
        formSchema={formSchema}
        data={data}
        handleChange={handleChange}
        isLoading={isLoading}
        errors={errors}
      />
    </div>
  );
};

FormWrapper.propTypes = {
  api: PropTypes.func,
  schema: PropTypes.object,
  formSchema: PropTypes.arrayOf(PropTypes.shape({})),
};
