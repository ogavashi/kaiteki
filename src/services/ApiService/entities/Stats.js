import { Base } from '.';

export class Stats extends Base {
  read = async (params) => {
    const result = await this.apiClient.get('stats', { query: { ...params } });

    return result;
  };
}
