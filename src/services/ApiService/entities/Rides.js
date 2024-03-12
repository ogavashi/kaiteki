import queryString from 'query-string';
import { Base } from '.';

export class Rides extends Base {
  read = async (params) => {
    const result = await this.apiClient.get('drives', { query: { ...params } });

    return result;
  };

  readById = async ({ id }) => {
    const result = await this.apiClient.get(`drives/${id}`);

    return result;
  };

  create = async (data) => {
    await this.apiClient.post('drives', { body: { ...data } });
  };

  companies = async () => {
    const result = await this.apiClient.get('drives/companies-all');

    return result;
  };

  update = async (data) => {
    await this.apiClient.patch(`drives/${data._id}`, { body: { ...data } });
  };

  deleteMany = async ({ ids }) => {
    const query = queryString.stringify({ ids });

    await this.apiClient.delete(`drives/?${query}`);
  };
}
