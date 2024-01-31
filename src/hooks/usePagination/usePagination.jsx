/* eslint-disable no-magic-numbers */
import { useCallback } from 'react';
import { useQuery } from '../useQuery';

export function usePagination(defaultPage = 1, defaultCount = 5) {
  const [query, setQuery] = useQuery();

  const handleChangePage = useCallback(
    (page, count) => {
      setQuery({ ...query, page, count });
    },
    [query, setQuery]
  );

  const handleChangeCount = useCallback(
    (page, count) => {
      setQuery({ ...query, page, count });
    },
    [query, setQuery]
  );

  return {
    page: +query.page || defaultPage,
    count: +query.count || defaultCount,
    handleChangePage,
    handleChangeCount,
  };
}
