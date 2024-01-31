import PropTypes from 'prop-types';
import { Table as AntTable } from 'antd';
import { useTable } from '@features/table';

export const Table = ({
  api,
  tableSchema,
  rowSelection,
  handleAddOnRow,
  shouldRefresh,
  handleRefresh,
}) => {
  const { data, isLoading, handleTableChange, page, count, tableColumns } = useTable(
    api,
    shouldRefresh,
    handleRefresh,
    tableSchema
  );

  return (
    <AntTable
      rowSelection={rowSelection}
      loading={isLoading}
      columns={tableColumns}
      dataSource={data}
      defaultFilteredValue={['number']}
      defaultSortOrder='asc'
      pagination={{
        pageSizeOptions: [5, 10, 20],
        position: ['bottomCenter'],
        showSizeChanger: true,
        current: page,
        pageSize: count,
        total: data?.meta?.total,
      }}
      onChange={handleTableChange}
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
  shouldRefresh: PropTypes.bool,
  handleRefresh: PropTypes.func,
};
