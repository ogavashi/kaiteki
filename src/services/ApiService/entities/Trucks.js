import { Base } from '.';

export class Trucks extends Base {
  read = async (params) => {
    console.log(params);
    const result = await this.apiClient.get('track', { query: { ...params } });

    console.log(result);

    return result;
  };
}
