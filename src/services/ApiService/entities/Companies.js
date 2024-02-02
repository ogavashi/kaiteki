import { resolveWithDelay } from '@lib';
import { Base } from '.';

const MOCK_DATA = [
  {
    id: 1,
    companyName: 'CompanyName',
  },
  {
    id: 2,
    companyName: 'ABC Ltd',
  },
  {
    id: 3,
    companyName: 'XYZ Corp',
  },
  {
    id: 4,
    companyName: 'Example Co',
  },
  {
    id: 5,
    companyName: 'Test Ltd',
  },
  {
    id: 6,
    companyName: 'NewCompany',
  },
  {
    id: 7,
    companyName: 'AnotherCorp',
  },
  {
    id: 8,
    companyName: 'Sample Company',
  },
  {
    id: 9,
    companyName: 'TestCorp',
  },
  {
    id: 10,
    companyName: 'LastCompany',
  },
  {
    id: 11,
    companyName: 'CompanyABC',
  },
];

export class Companies extends Base {
  read = async (params) => {
    const result = await resolveWithDelay(MOCK_DATA);

    const search = params?.search;

    if (search) {
      return result.filter((option) => option.companyName.includes(search));
    }

    return result;
  };

  delete = async (params) => {
    console.log(params);
    await resolveWithDelay();
  };
}
