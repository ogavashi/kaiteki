import { resolveWithDelay } from '@lib';
import { Base } from '.';

const MOCK_DATA = [
  {
    id: 1,
    number: 1,
    companyName: 'CompanyName',
    from: 'Київ',
    to: 'Львів',
    date: '11-02-2024',
    sum: 15000,
  },
  {
    id: 2,
    number: 2,
    companyName: 'ABC Ltd',
    from: 'Odessa',
    to: 'Kharkiv',
    date: '15-02-2024',
    sum: 20000,
  },
  {
    id: 3,
    number: 3,
    companyName: 'XYZ Corp',
    from: 'Lviv',
    to: 'Kyiv',
    date: '20-02-2024',
    sum: 12000,
  },
  {
    id: 4,
    number: 4,
    companyName: 'Example Co',
    from: 'Dnipro',
    to: 'Zaporizhia',
    date: '25-02-2024',
    sum: 18000,
  },
  {
    id: 5,
    number: 5,
    companyName: 'Test Ltd',
    from: 'Kharkiv',
    to: 'Odessa',
    date: '01-03-2024',
    sum: 22000,
  },
  {
    id: 6,
    number: 6,
    companyName: 'NewCompany',
    from: 'Zaporizhia',
    to: 'Kyiv',
    date: '05-03-2024',
    sum: 16000,
  },
  {
    id: 7,
    number: 7,
    companyName: 'AnotherCorp',
    from: 'Lviv',
    to: 'Dnipro',
    date: '10-03-2024',
    sum: 19000,
  },
  {
    id: 8,
    number: 8,
    companyName: 'Sample Company',
    from: 'Kyiv',
    to: 'Kharkiv',
    date: '15-03-2024',
    sum: 13000,
  },
  {
    id: 9,
    number: 9,
    companyName: 'TestCorp',
    from: 'Odessa',
    to: 'Zaporizhia',
    date: '20-03-2024',
    sum: 17000,
  },
  {
    id: 10,
    number: 10,
    companyName: 'LastCompany',
    from: 'Dnipro',
    to: 'Lviv',
    date: '25-03-2024',
    sum: 20000,
  },
  {
    id: 11,
    number: 11,
    companyName: 'CompanyABC',
    from: 'Kyiv',
    to: 'Lviv',
    date: '01-04-2024',
    sum: 14000,
  },
];

export class Acts extends Base {
  read = async (params) => {
    console.log(params);
    const result = await resolveWithDelay(MOCK_DATA);

    return result;
  };

  readById = async (params) => {
    const result = await resolveWithDelay(MOCK_DATA);

    const id = params?.id;

    if (id) {
      const record = result.find(({ id: localId }) => localId === +id);

      return record;
    }

    return null;
  };

  delete = async (params) => {
    console.log(params);
    await resolveWithDelay();
  };

  create = async (data) => {
    console.log(data);
    await resolveWithDelay();
  };
}

// {
//     title: '№',
//     dataIndex: 'number',
//     width: '5%',
//   },
//   {
//     title: 'Підприємство',
//     dataIndex: 'companyName',
//     sorter: true,
//     // render: (name) => `${name.first} ${name.last}`,
//     width: '15%',
//   },
//   {
//     title: 'Звідки',
//     dataIndex: 'from',
//   },
//   {
//     title: 'Куди',
//     dataIndex: 'to',
//   },
//   {
//     title: 'Дата',
//     dataIndex: 'date',
//     width: '15%',
//   },
//   {
//     title: 'Сума',
//     dataIndex: 'sum',
//     width: '15%',
//   },
// ];
