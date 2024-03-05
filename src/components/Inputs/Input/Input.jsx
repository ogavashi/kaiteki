import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Input as AInput, Form, InputNumber } from 'antd';
import { useDebounce } from '@hooks';

const DEFAULT_ROWS = 4;

export function Input({
  id,
  placeholder,
  rows,
  disabled,
  fieldProps,
  shouldDebounce,
  onChange,
  onBlur,
  value,
  errors,
  fieldKey,
}) {
  const { type } = fieldProps;

  const [localValue, setLocalValue] = useState();
  const debounced = useDebounce(localValue);

  const handleChange = useCallback(
    (event) => {
      if (!event) {
        return;
      }

      if (type === 'number') {
        onChange(id, event, fieldKey);
        return;
      }

      onChange(id, event.target.value, fieldKey);
    },
    [fieldKey, id, onChange, type]
  );

  const handleCustomChange = useCallback(
    (event) => {
      shouldDebounce ? setLocalValue(event) : handleChange(event);
    },

    [handleChange, shouldDebounce]
  );

  useEffect(() => {
    if (shouldDebounce) {
      handleChange(debounced);
    }
  }, [debounced, handleChange, shouldDebounce]);

  function renderInput() {
    const inputProps = {
      disabled,
      onChange: handleCustomChange,
      onBlur,
      value,
      placeholder: placeholder || 'Введіть дані',
      ...fieldProps,
    };

    switch (type) {
      case 'textarea':
        return <AInput.TextArea {...inputProps} rows={rows || DEFAULT_ROWS} />;
      case 'password':
        return <AInput.Password {...inputProps} />;
      case 'number':
        return <InputNumber {...inputProps} />;

      default:
        return <AInput {...inputProps} />;
    }
  }

  return (
    <Form.Item help={errors[id]} validateStatus={errors[id] && 'error'} style={{ marginBottom: 0 }}>
      {renderInput()}
    </Form.Item>
  );
}

Input.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  disabled: PropTypes.bool,
  fieldProps: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  shouldDebounce: PropTypes.bool,
  onBlur: PropTypes.func,
  data: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  errors: PropTypes.object,
  fieldKey: PropTypes.number,
  disabledValidation: PropTypes.bool,
};

Input.defaultProps = {
  placeholder: '',
  rows: DEFAULT_ROWS,
  disabled: false,
  fieldProps: {},
  errors: {},
  onBlur: () => {},
  fieldKey: undefined,
  value: undefined,
  disabledValidation: false,
};
