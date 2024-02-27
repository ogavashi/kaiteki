import qs from 'query-string';
import { bindMiddleware } from './middleware';
import { parseErrors } from '@features/error';

export class ApiClient {
  constructor({ url }) {
    this.defaultHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    this.url = url;
    this.requestEntry = bindMiddleware(this.fetch);
  }

  get(url, params = {}, shouldParse) {
    return this.request(
      {
        url,
        method: 'GET',
        ...params,
      },
      shouldParse
    );
  }

  post(url, params = {}) {
    return this.request({
      url,
      method: 'POST',
      ...params,
    });
  }

  put(url, params = {}) {
    return this.request({
      url,
      method: 'PUT',
      ...params,
    });
  }

  delete(url, params = {}) {
    return this.request({
      url,
      method: 'DELETE',
      ...params,
    });
  }

  patch(url, params = {}) {
    return this.request({
      url,
      method: 'PATCH',
      ...params,
    });
  }

  download(url) {
    const absoluteUrl = `${this.url}${url}`;

    const link = document.createElement('a');

    link.href = absoluteUrl;
    link.download = absoluteUrl;
    link.click();
  }

  #tryParseJSON(data) {
    let result = {};

    try {
      result = JSON.parse(data);
    } catch {
      result = {};
    }

    return result;
  }

  postFile(url, data, token) {
    return fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
  }

  getBlob(url, params = {}) {
    return this.request({
      url,
      method: 'GET',
      responseType: 'blob',
      ...params,
    });
  }

  fetch = async ({
    url,
    method,
    body = {},
    headers = {},
    query = {},
    signal = new AbortController().signal,
  }) => {
    // const token = store.getState().user.token;

    const config = {
      method,
      signal,
      mode: 'cors',
      credentials: 'include',
      headers: {
        ...this.defaultHeaders,
        ...headers,
        // Authorization: `Bearer ${token}`,
      },
      url,
    };

    if (method !== 'GET' && method !== 'HEAD') {
      config.body = JSON.stringify(body);
    }

    const querystring = Object.keys(query).length ? `?${qs.stringify(query)}` : '';

    return fetch(`${this.url}${url}${querystring}`, config);
  };

  async request(params, shouldParse = true) {
    const { responseType, ...otherParams } = params;

    try {
      const response = await this.requestEntry(otherParams);
      const BAD_SERVER_RESPONSE_RANGE = 400;

      let rawResponseData;
      let parsedData;

      if (responseType === 'blob') {
        rawResponseData = await response;
        parsedData = rawResponseData;
      } else {
        rawResponseData = await response.text();
        parsedData = shouldParse ? this.#tryParseJSON(rawResponseData) : rawResponseData;
      }

      if (response.status === 207) {
        const errorMessage = this.#tryParseJSON(rawResponseData).message;
        const parsedErrors = parseErrors({ message: errorMessage });

        if (parsedErrors) {
          // eslint-disable-next-line no-throw-literal
          throw { serverValidation: parsedErrors };
        }
      }

      if (response.status >= BAD_SERVER_RESPONSE_RANGE) {
        const errorMessage = this.#tryParseJSON(rawResponseData).message;

        if (errorMessage) {
          throw new Error(errorMessage);
        }

        // To modify error messages change realization here
        const parsedErrors = parseErrors(parsedData);

        if (parsedErrors) {
          throw { serverValidation: parsedErrors };
        }

        throw new Error('Bad response from server');
      }

      if (parsedData.status === 0) {
        throw parsedData.error;
      }

      return parsedData;
    } catch (error) {
      console.warn('Unhandled exception: ', error);

      throw error;
    }
  }
}
