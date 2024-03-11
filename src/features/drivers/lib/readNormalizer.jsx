export const readNormalizer = (rawData) => {
  return [
    {
      key: 1,
      label: `Ім'я`,
      children: <p>{rawData.fullName}</p>,
    },
    {
      key: 2,
      label: 'Email',
      children: <p>{rawData.email}</p>,
    },
    {
      key: 3,
      label: 'Ціна за кілометр',
      children: <p>{rawData.salaryPerOneKm} ₴/км</p>,
    },
  ];
};
