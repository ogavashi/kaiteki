import { Base } from './Base';

export class User extends Base {
  login = async ({ email, password }) => {
    const data = await this.apiClient.post('auth/login', { body: { email, password } });

    return data;
  };

  me = async () => {
    const data = await this.apiClient.get('auth/me');

    return data;
  };
}
