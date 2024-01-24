import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table as AntTable } from 'antd';

export const Table = ({ api, tableSchema }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const newData = await api();
      setData(newData);
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log(data, isLoading);

  return <AntTable loading={isLoading} columns={tableSchema} dataSource={data} />;
};

Table.propTypes = {
  api: PropTypes.func,
  tableSchema: PropTypes.arrayOf(PropTypes.shape({})),
};
