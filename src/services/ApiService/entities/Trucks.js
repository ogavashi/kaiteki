import queryString from 'query-string';
import { Base } from '.';

export class Trucks extends Base {
  read = async (params) => {
    console.log(params);
    const result = await this.apiClient.get('track', { query: { ...params } });

    console.log(result);

    return result;
  };

  readById = async ({ id }) => {
    const result = await this.apiClient.get(`track/${id}`);

    return result;
  };

  makes = async () => {
    const result = await this.apiClient.get('track/make-all');

    return result;
  };

  deleteMany = async ({ ids }) => {
    const query = queryString.stringify({ ids });

    console.log(query);

    await this.apiClient.delete(`track/?${query}`);
  };
}
