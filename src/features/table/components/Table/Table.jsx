import PropTypes from 'prop-types';
import { Table as AntTable } from 'antd';
import { useTable } from '@features/table';
import { useMemo } from 'react';

export const Table = ({
  api,
  tableSchema,
  rowSelection,
  handleAddOnRow,
  shouldRefresh,
  handleRefresh,
}) => {
  const { data, isLoading, handleTableChange, page, size, tableColumns } = useTable(
    api,
    shouldRefresh,
    handleRefresh,
    tableSchema
  );

  const dataSource = useMemo(() => data?.tableData, [data]);

  return (
    <AntTable
      rowSelection={rowSelection}
      loading={isLoading}
      columns={tableColumns}
      dataSource={dataSource}
      defaultFilteredValue={['number']}
      defaultSortOrder='asc'
      pagination={{
        pageSizeOptions: [1, 5, 10, 20],
        position: ['bottomCenter'],
        showSizeChanger: true,
        current: page,
        pageSize: size,
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
