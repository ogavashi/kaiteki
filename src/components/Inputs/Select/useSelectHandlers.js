import { useCallback } from 'react';

export function useSelectHandlers({
  includeAllOption,
  api,
  allOption,
  setOptions,
  notify,
  selectApiRecord,
  setIsLoading,
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

        console.log('FETCHED', newOptions);

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

  const handleChange = useCallback((values, selectedValue, treeExtra) => {
    console.log(values, selectedValue, treeExtra);
  }, []);

  return { handleClick, handleSearch, handleChange };
}
