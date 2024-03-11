export const readNormalizer = (rawData) => {
  return [
    {
      key: 1,
      label: 'Вага',
      children: <p>{rawData.weight} кг</p>,
    },
    {
      key: 2,
      label: 'Тип',
      children: <p>{rawData.type}</p>,
    },
    {
      key: 3,
      label: 'Номер',
      children: <p>{rawData.trailerNumber}</p>,
    },
  ];
};
