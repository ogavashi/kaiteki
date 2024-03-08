import queryString from 'query-string';
import { Base } from '.';

export class Trailers extends Base {
  read = async (params) => {
    const result = await this.apiClient.get('trailer', { query: { ...params } });

    return result;
  };

  readById = async ({ id }) => {
    const result = await this.apiClient.get(`trailer/${id}`);

    return result;
  };

  create = async (data) => {
    await this.apiClient.post('trailer', { body: { ...data } });
  };

  types = async () => {
    const result = await this.apiClient.get('trailer/types-all');

    return result;
  };

  deleteMany = async ({ ids }) => {
    const query = queryString.stringify({ ids });

    await this.apiClient.delete(`trailer/?${query}`);
  };
}
