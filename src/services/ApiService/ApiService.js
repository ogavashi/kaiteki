import { AppConfig, PAGE_KEYS } from '@constants';
import { ApiClient } from './ApiClient';
import { Acts, Companies, Drivers, Rides, Test, Trailers, Trucks, User } from './entities';

class ApiService {
  constructor({ apiUrl, token } = {}) {
    if (!apiUrl) {
      throw new Error('Invalid apiUrl');
    }

    const apiClient = new ApiClient({ url: apiUrl, token });

    this[PAGE_KEYS.TEST] = new Test({ apiClient });
    this[PAGE_KEYS.ACTS] = new Acts({ apiClient });
    this[PAGE_KEYS.TRUCKS] = new Trucks({ apiClient });
    this[PAGE_KEYS.COMPANIES] = new Companies({ apiClient });
    this[PAGE_KEYS.TRAILERS] = new Trailers({ apiClient });
    this[PAGE_KEYS.DRIVERS] = new Drivers({ apiClient });
    this[PAGE_KEYS.RIDES] = new Rides({ apiClient });
    this.user = new User({ apiClient });
  }
}

export default new ApiService({
  apiUrl: AppConfig.apiUrl,
});
