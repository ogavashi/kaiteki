/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';

export const Filters = ({ filters, handleRefresh }) => {
  const [data, setData] = useState({});

  const handleChange = useCallback((name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {filters?.map(({ id, component: Component, ...props }) => {
          return <Component key={id} id={id} data={data} onChange={handleChange} {...props} />;
        })}
      </div>
    </div>
  );
};

Filters.propTypes = {
  filters: PropTypes.array,
  handleRefresh: PropTypes.func,
};
