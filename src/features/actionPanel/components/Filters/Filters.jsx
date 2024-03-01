/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { ItemLabel } from '@components';
import { useQuery } from '@hooks';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const Filters = ({ filters, handleRefresh }) => {
  const [query, setQuery] = useQuery();

  const normalizedQuery = useMemo(() => {
    const newQuery = Object.fromEntries(
      Object.keys(query).map((fieldKey) => {
        const field = filters.find(({ id }) => id === fieldKey);
        const queryField = query[fieldKey];

        if (field?.fieldProps?.apiById) {
          return [fieldKey, { id: queryField, api: field?.fieldProps?.apiById }];
        }

        return [fieldKey, queryField];
      })
    );

    return newQuery;
  }, [query, filters]);

  const [data, setData] = useState(normalizedQuery);

  const handleChange = useCallback((name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  }, []);

  useEffect(() => {
    setQuery({ ...data, page: 1 });
  }, [data]);

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      {filters?.map(({ id, component: Component, label, ...props }) => {
        return (
          <ItemLabel
            key={id}
            label={label}
            // style={{ ...(options ? { minWidth: '8rem', maxWidth: '10rem' } : {}) }}
          >
            <Component key={id} id={id} data={data} onChange={handleChange} {...props} />
          </ItemLabel>
        );
      })}
    </div>
  );
};

Filters.propTypes = {
  filters: PropTypes.array,
  handleRefresh: PropTypes.func,
};
