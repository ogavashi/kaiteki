import { useCallback } from 'react';

export function useSelectHandlers({
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
  onChange,
  data,
  value,
}) {
  const handleFetch = useCallback(
    async (params) => {
      if (!api) {
        return;
      }
      try {
        setIsLoading(true);

        const response = await api(params);

        const newOptions = response.map(
          (record) => selectApiRecord?.(record) || { value: record.id, label: record.name }
        );

        if (includeAllOption) {
          newOptions.unshift(allOption);
        }

        setOptions(newOptions);
      } catch (error) {
        notify({ type: 'error', message: 'Помилка', description: error.message });
      } finally {
        setIsLoading(false);
      }
    },
    [allOption, api, includeAllOption, notify, selectApiRecord, setIsLoading, setOptions]
  );

  const handleFetchById = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await value.api({ id: value.id });
      const newOptions = response.map(
        (record) => selectApiRecord?.(record) || { value: record.id, label: record.name }
      );
      setOptions(newOptions);
      const newValues = newOptions.map((record) => record.value);
      onChange(id, newValues);
    } catch (error) {
      notify({ type: 'error', message: 'Помилка', description: error.message });
    } finally {
      setIsLoading(false);
    }
  }, [id, notify, onChange, selectApiRecord, setIsLoading, setOptions, value]);

  const handleClick = useCallback(() => {
    handleFetch();
  }, [handleFetch]);

  const handleSearch = useCallback(
    (value) => {
      handleFetch({ search: value });
    },
    [handleFetch]
  );

  const handleChange = useCallback(
    (values, selectedValue, treeExtra) => {
      const normalizedValue =
        normalizer?.({
          values,
          selectedValue,
          data,
          options: rawOptions || options,
          id,
          treeExtra,
          allOption,
        }) || selectedValue;

      onChange(id, normalizedValue);
    },
    [allOption, data, id, normalizer, onChange, options, rawOptions]
  );

  return { handleClick, handleSearch, handleChange, handleFetchById };
}
