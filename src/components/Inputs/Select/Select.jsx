/* eslint-disable no-unused-vars */
import { useMemo, useState } from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';
import { Select as ASelect, Spin } from 'antd';

export function Select({
  id,
  data,
  fieldProps,
  disabled,
  placeholder,
  errors,
  onChange,
  fieldKey,
}) {
  const { options: rawOptions, includeAllOption, ...selectProps } = fieldProps;
  const value = data[id];

  const defaultOptions = useMemo(() => {
    const allOption = { label: 'Всі', value: '' };
    const newDefaultOptions = rawOptions || [];

    if (includeAllOption) {
      return [allOption, ...newDefaultOptions];
    }

    return newDefaultOptions;
  }, [includeAllOption, rawOptions]);

  const [options, setOptions] = useState(defaultOptions);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Form.Item
      help={errors?.[id]}
      validateStatus={errors?.[id] && 'error'}
      style={{ marginBottom: 0 }}
    >
      <ASelect
        // onClick={handleSelectClick}
        options={options}
        // filterOption={handleFilter}
        // onSearch={api && handleSearch}
        placeholder={placeholder}
        disabled={disabled}
        showSearch
        value={value}
        onChange={onChange}
        {...selectProps}
        notFoundContent={
          isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Spin size='small' />
            </div>
          ) : null
        }
      />
    </Form.Item>
  );
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  fieldProps: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  errors: PropTypes.object,
  disabledValidation: PropTypes.bool,
  fieldKey: PropTypes.number,
  query: PropTypes.object,
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
