export const tableSchema = [
  {
    title: 'Компанія',
    dataIndex: 'companyName',
    sorter: true,
    width: '30%',
  },
  {
    title: 'Від',
    dataIndex: 'from',
    sorter: true,
    width: '30%',
  },
  {
    title: 'До',
    dataIndex: 'to',
    width: '30%',
    sorter: true,
  },
  {
    title: 'Водій',
    dataIndex: 'driver',
    render: (driver) => driver?.fullName,
    width: '30%',
    sorter: true,
  },
  {
    title: 'Сума',
    dataIndex: 'price',
    width: '40%',
    sorter: true,
  },
];
