export class Base {
  #pageSize;

  constructor({ apiClient }) {
    if (!apiClient) throw new Error('[apiClient] required');

    this.apiClient = apiClient;
  }
}
