import { useCallback } from 'react';
import { useQuery } from '../useQuery';

export function usePagination() {
  const [query, setQuery] = useQuery();

  const handleChangePage = useCallback(
    (page, count) => {
      setQuery({ page, count });
    },
    [setQuery]
  );

  const handleChangeCount = useCallback(
    (page, count) => {
      setQuery({ page, count });
    },
    [setQuery]
  );

  return {
    page: +query.page || 1,
    count: +query.count || 5,
    handleChangePage,
    handleChangeCount,
  };
}
