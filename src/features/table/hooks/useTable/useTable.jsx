import { useCallback, useEffect, useState } from 'react';

export function useTable(api, shouldRefresh, handleRefresh) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const newData = await api(tableParams);
      setData(newData);
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
    }
  }, [api, tableParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (shouldRefresh) {
      fetchData();
      handleRefresh(false);
    }
  }, [fetchData, handleRefresh, shouldRefresh]);

  const handleTableChange = useCallback(
    (pagination, filters, sorter) => {
      setTableParams({
        pagination,
        filters,
        ...sorter,
      });

      // `dataSource` is useless since `pageSize` changed
      if (pagination.pageSize !== tableParams.pagination?.pageSize) {
        setData([]);
      }
    },
    [tableParams.pagination?.pageSize]
  );

  return { data, handleTableChange, isLoading, tableParams };
}
