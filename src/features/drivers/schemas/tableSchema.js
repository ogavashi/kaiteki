export const tableSchema = [
  {
    title: `Ім'я`,
    dataIndex: 'fullName',
    sorter: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: true,
  },
  {
    title: 'Ціна за кілометр',
    dataIndex: 'salaryPerOneKm',
    render: (value) => `${value} ₴/км`,
    sorter: true,
  },
];
