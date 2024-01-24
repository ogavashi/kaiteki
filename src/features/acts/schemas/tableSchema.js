export const tableSchema = [
  {
    title: '№',
    dataIndex: 'number',
    width: '5%',
    sorter: true,
  },
  {
    title: 'Підприємство',
    dataIndex: 'companyName',
    sorter: true,
    // render: (name) => `${name.first} ${name.last}`,
    width: '15%',
  },
  {
    title: 'Звідки',
    dataIndex: 'from',
  },
  {
    title: 'Куди',
    dataIndex: 'to',
  },
  {
    title: 'Дата',
    dataIndex: 'date',
    width: '15%',
  },
  {
    title: 'Сума',
    dataIndex: 'sum',
    width: '15%',
  },
];
