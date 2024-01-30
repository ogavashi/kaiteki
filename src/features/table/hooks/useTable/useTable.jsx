/* eslint-disable no-unused-vars */
import { usePagination, useQuery } from '@hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

export function useTable(api, shouldRefresh, handleRefresh) {
  const params = useParams();
  const pagination = usePagination();

  const [query, setQuery] = useQuery();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchParams = useMemo(
    () => ({
      ...params,
      ...query,
      total: true,
    }),
    [params, query]
  );

  const fetchData = useCallback(
    async (params) => {
      try {
        setIsLoading(true);
        const newData = await api(params);
        setData(newData);
      } catch (error) {
        console.warn(error);
      } finally {
        setIsLoading(false);
      }
    },
    [api]
  );

  useEffect(() => {
    fetchData(fetchParams);
  }, [fetchData, fetchParams]);

  useEffect(() => {
    if (shouldRefresh) {
      fetchData(fetchParams);
      handleRefresh(false);
    }
  }, [fetchData, fetchParams, handleRefresh, shouldRefresh]);

  const handleTableChange = useCallback(
    (_pagination, _filters, sorter) => {
      const { field, order } = sorter;

      const updatedQuery = order ? { order, field } : { order: null, field: null };

      setQuery({ ...query, ...updatedQuery });
    },
    [query, setQuery]
  );

  return { data, isLoading, handleTableChange, pagination };
}
