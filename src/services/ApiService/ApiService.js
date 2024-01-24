// import AppConfig from '@config';
import { PAGE_KEYS } from '@constants';
import { ApiClient } from './ApiClient';
import { Acts, Test } from './entities';

class ApiService {
  constructor({ apiUrl, token } = {}) {
    if (!apiUrl) {
      throw new Error('Invalid apiUrl');
    }

    const apiClient = new ApiClient({ url: apiUrl, token });

    this[PAGE_KEYS.TEST] = new Test({ apiClient });
    this[PAGE_KEYS.ACTS] = new Acts({ apiClient });
  }
}

export default new ApiService({
  apiUrl: 'sad',
});
