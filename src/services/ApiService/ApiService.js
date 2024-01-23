// import AppConfig from '@config';
import { PAGE_KEYS } from '@constants';
import { ApiClient } from './ApiClient';
import { Test } from './entities';

class ApiService {
  constructor({ apiUrl, token } = {}) {
    if (!apiUrl) {
      throw new Error('Invalid apiUrl');
    }

    const apiClient = new ApiClient({ url: apiUrl, token });

    this[PAGE_KEYS.TEST] = new Test({ apiClient });
  }
}

export default new ApiService({
  apiUrl: 'sad',
});
