export const tableSchema = [
  {
    title: 'Вага',
    dataIndex: 'weight',
    sorter: true,
    render: (weight) => `${weight} кг`,
    width: '30%',
  },
  {
    title: 'Тип',
    dataIndex: 'type',
    width: '30%',
    sorter: true,
  },
  {
    title: 'Номер',
    dataIndex: 'trailerNumber',
    width: '40%',
    sorter: true,
  },
];
