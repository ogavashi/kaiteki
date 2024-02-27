/* eslint-disable no-prototype-builtins */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';
import { Select as ASelect, Spin } from 'antd';
import { WithNotification } from '@features/notification';
import { useSelectHandlers } from './useSelectHandlers';

export const Select = WithNotification(
  ({ id, data, fieldProps, disabled, placeholder, errors, onChange, notify }) => {
    const {
      options: rawOptions,
      includeAllOption,
      api,
      apiById,
      queryKey,
      selectApiRecord,
      defaultValue,
      normalizer,
      ...selectProps
    } = fieldProps;
    const value = data[id];
    const selectValue = useMemo(() => (value?.api ? null : value), [value]);

    const allOption = useMemo(() => ({ label: 'Всі', value: 'all' }), []);

    const defaultOptions = useMemo(() => {
      const newDefaultOptions = rawOptions || [];

      if (includeAllOption) {
        return [allOption, ...newDefaultOptions];
      }

      return newDefaultOptions;
    }, [allOption, includeAllOption, rawOptions]);

    useEffect(() => {
      if (defaultValue !== undefined && !data.hasOwnProperty(id)) {
        onChange(id, defaultValue);
      }
    }, [id, fieldProps?.defaultValue]);

    const [options, setOptions] = useState(defaultOptions);
    const [isLoading, setIsLoading] = useState(false);

    const { handleClick, handleSearch, handleChange, handleFetchById } = useSelectHandlers({
      id,
      includeAllOption,
      api,
      rawOptions,
      options,
      allOption,
      setOptions,
      notify,
      selectApiRecord,
      setIsLoading,
      normalizer,
      data,
      onChange,
      value,
    });

    useEffect(() => {
      if (value?.api) {
        handleFetchById();
      }
    }, [value]);

    return (
      <Form.Item
        help={errors?.[id]}
        validateStatus={errors?.[id] && 'error'}
        style={{ marginBottom: 0 }}
      >
        <ASelect
          defaultValue={defaultValue}
          popupMatchSelectWidth={false}
          dropdownStyle={{ maxWidth: 'fit-content' }}
          allowClear
          options={options}
          onSearch={handleSearch}
          placeholder={placeholder}
          disabled={disabled}
          showSearch
          value={selectValue}
          filterOption={false}
          onChange={handleChange}
          onClick={handleClick}
          loading={isLoading}
          {...selectProps}
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
