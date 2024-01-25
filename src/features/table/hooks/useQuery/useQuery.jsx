import { useMemo, useCallback } from 'react';
import queryString from 'query-string';
import { useNavigate, useLocation } from 'react-router-dom';

export function useQuery(fields, replace = true) {
  const navigate = useNavigate();
  const location = useLocation();

  const query = useMemo(() => {
    const parsedQueryString = queryString.parse(location.search, {
      parseBooleans: true,
      arrayFormat: 'colon-list-separator',
    });

    const normalizedQueryString = Object.fromEntries(
      Object.entries(parsedQueryString).map(([key, value]) => {
        const formatter = fields?.find((field) => key === field.id)?.formatter;

        return [key, formatter ? formatter(value) : value];
      })
    );

    return normalizedQueryString;
  }, [fields, location.search]);

  const setQuery = useCallback(
    (newQuery) => {
      const params = {
        ...query,
        ...newQuery,
      };

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
