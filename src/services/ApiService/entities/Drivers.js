import queryString from 'query-string';
import { Base } from '.';

export class Drivers extends Base {
  read = async (params) => {
    const result = await this.apiClient.get('user/drivers', { query: { ...params } });

    return result;
  };

  readById = async ({ id }) => {
    const result = await this.apiClient.get(`user/${id}`);

    return result;
  };

  create = async (data) => {
    await this.apiClient.post('auth/registration', {
      body: { ...data },
    });
  };

  update = async (data) => {
    await this.apiClient.patch(`user/${data._id}`, { body: { ...data, role: data.role._id } });
  };

  deleteMany = async ({ ids }) => {
    const query = queryString.stringify({ ids });

    await this.apiClient.delete(`user/?${query}`);
  };
}
