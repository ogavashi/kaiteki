import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Form } from 'antd';
import dayjs from 'dayjs';

export function Date({
  id,
  placeholder,
  fieldProps,
  dateFormat,
  dateTimeFormat,
  onChange,
  data,
  errors,
  disabled,
  fieldKey,
}) {
  const { defaultValue, showDateTime } = fieldProps;

  const value = !data[id] ? null : dayjs(data[id]);

  const handleChange = useCallback(
    (newValue) => {
      onChange(id, newValue, fieldKey);
    },
    [fieldKey, id, onChange]
  );

  useEffect(() => {
    if (defaultValue && !data[id]) {
      onChange(id, defaultValue, fieldKey);
    }
  }, [id, fieldProps.defaultValue, defaultValue, data, onChange, fieldKey]);

  return (
    <Form.Item help={errors[id]} validateStatus={errors[id] && 'error'} style={{ marginBottom: 0 }}>
      <DatePicker
        defaultValue={fieldProps?.defaultValue}
        format={showDateTime ? dateTimeFormat : dateFormat}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        {...(showDateTime && { showTime: { format: 'HH:mm' } })}
        {...fieldProps}
      />
    </Form.Item>
  );
}

Date.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  placeholder: PropTypes.string,
  dateFormat: PropTypes.string,
  dateTimeFormat: PropTypes.string,
  fieldProps: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  form: PropTypes.object,
  errors: PropTypes.object,
  disabled: PropTypes.bool,
  fieldKey: PropTypes.number,
};

Date.defaultProps = {
  placeholder: '',
  dateFormat: 'DD-MM-YYYY',
  dateTimeFormat: 'YYYY-MM-DD HH:mm',
  fieldProps: {},
  errors: {},
  disabled: false,
  form: null,
  fieldKey: undefined,
};
