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
  const { data, isLoading, handleTableChange, pagination } = useTable(
    api,
    shouldRefresh,
    handleRefresh
  );

  const { page, count, handleChangeCount, handleChangePage } = pagination;

  return (
    <AntTable
      rowSelection={rowSelection}
      loading={isLoading}
      columns={tableSchema}
      dataSource={data}
      pagination={{
        pageSizeOptions: [5, 10, 20],
        position: ['bottomCenter'],
        showSizeChanger: true,
        current: page,
        pageSize: count,
        onChange: handleChangePage,
        onShowSizeChange: handleChangeCount,
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
