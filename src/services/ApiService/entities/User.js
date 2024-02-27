import { Base } from './Base';

export class User extends Base {
  login = async ({ email, password }) => {
    const data = await this.apiClient.post('auth/login', { body: { email, password } });

    return data;
  };
}
