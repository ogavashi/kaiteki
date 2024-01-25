import PropTypes from 'prop-types';
import { Table as AntTable } from 'antd';
import { useSelectedColumns, useTable } from '@features/table';

export const Table = ({ api, tableSchema }) => {
  const { data, isLoading, handleTableChange, tableParams } = useTable(api);
  const rowSelection = useSelectedColumns(['all', 'none', 'inverted', 'even', 'odd']);

  return (
    <AntTable
      rowSelection={rowSelection}
      loading={isLoading}
      columns={tableSchema}
      dataSource={data}
      onChange={handleTableChange}
      pagination={{ ...tableParams.pagination }}
      rowKey={(record) => record.id}
      onRow={(record) => ({
        onClick: () => console.log(record),
      })}
    />
  );
};

Table.propTypes = {
  api: PropTypes.func,
  tableSchema: PropTypes.arrayOf(PropTypes.shape({})),
};
