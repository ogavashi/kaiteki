export const readNormalizer = (rawData) => {
  return [
    {
      key: 1,
      label: 'Марка',
      children: <p>{rawData.make}</p>,
    },
    {
      key: 2,
      label: 'Назва марки',
      children: <p>{rawData.carModel}</p>,
    },
    {
      key: 3,
      label: 'Вага',
      children: <p>{rawData.weight} кг</p>,
    },
    {
      key: 4,
      label: 'Витрати палива',
      children: <p>{rawData.fuelCosts} на 100 км</p>,
    },
    {
      key: 5,
      label: `Об'єм баку`,
      children: <p>{rawData.gasolineTankCapacity}</p>,
    },
    {
      key: 6,
      label: 'Номер',
      children: <p>{rawData.trackNumber}</p>,
    },
  ];
};
