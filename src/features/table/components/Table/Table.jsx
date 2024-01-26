import PropTypes from 'prop-types';
import { Table as AntTable } from 'antd';
import { useTable } from '@features/table';

export const Table = ({ api, tableSchema, rowSelection, handleAddOnRow }) => {
  const { data, isLoading, handleTableChange, tableParams } = useTable(api);

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
        onClick: () => handleAddOnRow(record.id),
      })}
    />
  );
};

Table.propTypes = {
  api: PropTypes.func,
  tableSchema: PropTypes.arrayOf(PropTypes.shape({})),
  rowSelection: PropTypes.object,
  handleAddOnRow: PropTypes.func,
};
