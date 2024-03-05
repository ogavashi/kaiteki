import { normalizeData } from '../../lib/normalizeData';
import { useIsFirstRender, usePagination, useQuery } from '@hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

export function useTable(api, shouldRefresh, handleRefresh, tableSchema, normalizer) {
  const params = useParams();
  const isFirstRender = useIsFirstRender();

  const [query, setQuery] = useQuery();
  const { size, page } = usePagination();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const tableColumns = useMemo(
    () =>
      tableSchema.map((col) => ({
        ...col,
        defaultSortOrder: query.field === col.dataIndex && query.order,
      })),
    [query, tableSchema]
  );

  const fetchParams = useMemo(
    () => ({
      ...params,
      ...query,
      size,
      page,
      total: true,
    }),
    [size, page, params, query]
  );

  const fetchData = useCallback(
    async (params) => {
      try {
        setIsLoading(true);
        const newData = await api(params);

        const normalized = normalizer?.(newData) || normalizeData(newData);

        setData(normalized);
      } catch (error) {
        console.warn(error);
      } finally {
        setIsLoading(false);
      }
    },
    [api, normalizer]
  );

  useEffect(() => {
    if (isFirstRender) {
      setQuery({ page, size });
      return;
    }
    fetchData(fetchParams);
  }, [size, fetchData, fetchParams, isFirstRender, page, setQuery]);

  useEffect(() => {
    if (shouldRefresh) {
      fetchData(fetchParams);
      handleRefresh(false);
    }
  }, [fetchData, fetchParams, handleRefresh, shouldRefresh]);

  const handleTableChange = useCallback(
    (pagination, _filters, sorter) => {
      const { current: page, pageSize: size } = pagination;

      const { field, order } = sorter;

      let updatedQuery = order ? { order, field } : { order: null, field: null };

      const isSortingChanged =
        updatedQuery.field && updatedQuery.order
          ? query.field !== updatedQuery.field || query.order !== updatedQuery.order
          : false;

      updatedQuery = isSortingChanged
        ? { ...updatedQuery, page: 1 }
        : { ...updatedQuery, page, size };

      setQuery({ ...query, ...updatedQuery });
    },
    [query, setQuery]
  );

  return { data, isLoading, handleTableChange, page, size, tableColumns };
}
