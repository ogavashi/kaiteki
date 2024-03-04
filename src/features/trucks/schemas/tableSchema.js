// {
//   "_id": "65e62af35dbc87dabc49afbc",
//   "make": "biba222",
//   "carModel": "boba22222",
//   "weight": 10020,
//   "fuelCosts": 300,
//   "gasolineTankCapacity": 10.3,
//   "trackNumber": "AO1234VC",
//   "__v": 0
// },

export const tableSchema = [
  {
    title: 'Марка',
    dataIndex: 'make',
    width: '5%',
    sorter: true,
  },
  {
    title: 'Модель',
    dataIndex: 'carModel',
    width: '5%',
    sorter: true,
  },
  {
    title: 'Номер',
    dataIndex: 'trackNumber',
    width: '5%',
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
    render: (fuelCosts) => `${fuelCosts} на 100 км`,
    sorter: true,
  },
  {
    title: `Об'єм баку`,
    dataIndex: 'gasolineTankCapacity',
    render: (gasolineTankCapacity) => `${gasolineTankCapacity} л`,
    sorter: true,
  },
];
