export const readNormalizer = (rawData) => {
  return [
    {
      key: 1,
      label: 'Номер',
      children: <p>{rawData.number}</p>,
    },
    {
      key: 2,
      label: 'Назва компанії',
      children: <p>{rawData.companyName}</p>,
    },
    {
      key: 3,
      label: 'Звідки',
      children: <p>{rawData.from}</p>,
    },
    {
      key: 4,
      label: 'Куди',
      children: <p>{rawData.to}</p>,
    },
    {
      key: 5,
      label: 'Дата',
      children: <p>{rawData.date}</p>,
    },
    {
      key: 6,
      label: 'Сума',
      children: <p>{rawData.sum}</p>,
    },
  ];
};
