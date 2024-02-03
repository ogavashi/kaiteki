/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';
import { Select as ASelect, Spin } from 'antd';
import { WithNotification } from '@features/notification';
import { useSelectHandlers } from './useSelectHandlers';

// includeAllOption, api, allOption, setOptions, notify

export const Select = WithNotification(
  ({ id, data, fieldProps, disabled, placeholder, errors, onChange, notify }) => {
    const {
      options: rawOptions,
      includeAllOption,
      api,
      selectApiRecord,
      label,
      ...selectProps
    } = fieldProps;
    const value = data[id];

    const allOption = useMemo(() => ({ label: 'Всі', value: '' }), []);

    const defaultOptions = useMemo(() => {
      const newDefaultOptions = rawOptions || [];

      if (includeAllOption) {
        return [allOption, ...newDefaultOptions];
      }

      return newDefaultOptions;
    }, [allOption, includeAllOption, rawOptions]);

    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { handleClick, handleSearch } = useSelectHandlers({
      api,
      notify,
      setOptions,
      selectApiRecord,
      setIsLoading,
      allOption,
      includeAllOption: true,
    });

    useEffect(() => {
      console.log('New Options', options);
    }, [options]);

    console.log(options);

    return (
      <Form.Item
        help={errors?.[id]}
        validateStatus={errors?.[id] && 'error'}
        style={{ marginBottom: 0 }}
        label={label}
      >
        <ASelect
          options={options}
          onSearch={handleSearch}
          placeholder={placeholder}
          disabled={disabled}
          showSearch
          value={value}
          filterOption={false}
          // onChange={onChange}
          onClick={handleClick}
          loading={isLoading}
          variant='filled'
          style={{
            minWidth: '10rem',
          }}
          // {...selectProps}
        />
      </Form.Item>
    );
  }
);

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
