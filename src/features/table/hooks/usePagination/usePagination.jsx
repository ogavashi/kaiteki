import { useCallback } from 'react';
import { useQuery } from '../useQuery';

export function usePagination() {
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
    page: +query.page || 1,
    count: +query.count || 10,
    handleChangePage,
    handleChangeCount,
  };
}
