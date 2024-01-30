import { useMemo, useCallback } from 'react';
import queryString from 'query-string';
import { useNavigate, useLocation } from 'react-router-dom';

export function useQuery(replace = true) {
  const navigate = useNavigate();
  const location = useLocation();

  const query = useMemo(() => {
    const parsedQueryString = queryString.parse(location.search, {
      parseBooleans: true,
      arrayFormat: 'colon-list-separator',
    });

    return parsedQueryString;
  }, [location.search]);

  const setQuery = useCallback(
    (newQuery) => {
      const params = {
        ...query,
        ...newQuery,
      };

      console.log('new query', params);

      navigate(
        {
          pathname: location.pathname,
          search: `?${queryString.stringify(params, {
            skipNull: true,
            skipEmptyString: true,
            arrayFormat: 'colon-list-separator',
          })}`,
        },
        { replace }
      );
    },
    [query, navigate, location.pathname, replace]
  );

  return [query, setQuery];
}
