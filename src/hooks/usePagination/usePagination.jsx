/* eslint-disable no-magic-numbers */
import { useCallback } from 'react';
import { useQuery } from '../useQuery';

export function usePagination(defaultPage = 1, defaultCount = 5) {
  const [query, setQuery] = useQuery();

  const handleChangePage = useCallback(
    (page, size) => {
      setQuery({ ...query, page, size });
    },
    [query, setQuery]
  );

  const handleChangeCount = useCallback(
    (page, size) => {
      setQuery({ ...query, page, size });
    },
    [query, setQuery]
  );

  return {
    page: +query.page || defaultPage,
    size: +query.size || defaultCount,
    handleChangePage,
    handleChangeCount,
  };
}
