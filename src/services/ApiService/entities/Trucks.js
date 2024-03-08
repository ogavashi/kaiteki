import queryString from 'query-string';
import { Base } from '.';

export class Trucks extends Base {
  read = async (params) => {
    const result = await this.apiClient.get('track', { query: { ...params } });

    return result;
  };

  readById = async ({ id }) => {
    const result = await this.apiClient.get(`track/${id}`);

    return result;
  };

  create = async (data) => {
    await this.apiClient.post('track', { body: { ...data } });
  };

  makes = async () => {
    const result = await this.apiClient.get('track/make-all');

    return result;
  };

  deleteMany = async ({ ids }) => {
    const query = queryString.stringify({ ids });

    await this.apiClient.delete(`track/?${query}`);
  };
}
