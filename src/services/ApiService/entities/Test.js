import { resolveWithDelay } from '@lib';
import { Base } from '.';

const MOCK_DATA = [{ name: 'Hello' }];

export class Test extends Base {
  read = async (params) => {
    console.log(params);
    const result = await resolveWithDelay(MOCK_DATA);

    return result;
  };
}
