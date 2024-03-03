// [
//   {
//       "_id": "65dd8f48cdeb4e07d043bdc0",
//       "make": "biba222",
//       "brand": "boba",
//       "weight": 10020,
//       "fuelCosts": 3000,
//       "gasolineTankCapacity": 5.3,
//       "__v": 0
//   }
// ]

export const tableSchema = [
  {
    title: 'Марка',
    dataIndex: 'brand',
    width: '5%',
    sorter: true,
  },
  {
    title: 'Вага',
    dataIndex: 'weight',
    sorter: true,
    render: (weight) => `${weight} кг`,
    width: '15%',
  },
  {
    title: 'Витрати палива',
    dataIndex: 'fuelCosts',
  },
  {
    title: `Об'єм баку`,
    dataIndex: 'gasolineTankCapacity',
  },
];
