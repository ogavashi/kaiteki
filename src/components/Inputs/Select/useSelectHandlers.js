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
  data,
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
        }) || selectedValue;

      console.log(normalizedValue);
    },
    [data, id, normalizer, options, rawOptions]
  );

  return { handleClick, handleSearch, handleChange };
}
