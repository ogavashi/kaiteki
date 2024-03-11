/* eslint-disable no-prototype-builtins */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Divider, Form, Input, Space } from 'antd';
import PropTypes from 'prop-types';
import { Select as ASelect, Spin } from 'antd';
import { WithNotification } from '@features/notification';
import { useSelectHandlers } from './useSelectHandlers';
import { PlusOutlined } from '@ant-design/icons';

export const Select = WithNotification(
  ({ id, data, fieldProps, disabled, placeholder, errors, onChange, notify }) => {
    const {
      options: rawOptions,
      includeAllOption,
      addable,
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

    const inputRef = useRef(null);

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

    const [name, setName] = useState('');

    const onNameChange = useCallback((event) => {
      setName(event.target.value);
    }, []);

    const addItem = useCallback(
      (e) => {
        e.preventDefault();
        const isPresent = options.find(({ value: optionValue }) => optionValue === name);

        if (isPresent || !name) {
          return;
        }

        setOptions([...options, { value: name, label: name }]);
        setName('');
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      },
      [options, name]
    );

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
          onFocus={handleClick}
          // onClick={handleClick}
          loading={isLoading}
          {...selectProps}
          dropdownRender={
            addable &&
            ((menu) => (
              <>
                {menu}
                <Divider
                  style={{
                    margin: '8px 0',
                  }}
                />
                <Space
                  style={{
                    padding: '0 8px 4px',
                  }}
                >
                  <Input
                    placeholder='Введіть новий запис...'
                    ref={inputRef}
                    value={name}
                    onChange={onNameChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button type='text' icon={<PlusOutlined />} onClick={addItem}>
                    Додати запис
                  </Button>
                </Space>
              </>
            ))
          }
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
