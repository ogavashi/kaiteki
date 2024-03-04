export const tableSchema = [
  {
    title: 'Вага',
    dataIndex: 'weight',
    sorter: true,
    render: (weight) => `${weight} кг`,
    width: '15%',
  },
  {
    title: 'Тип',
    dataIndex: 'type',
    width: '5%',
    sorter: true,
  },
  {
    title: 'Номер',
    dataIndex: 'trailerNumber',
    width: '5%',
    sorter: true,
  },
];
