import RequestError from '../errors/RequestError';

type HttpRequestType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const request = async (requestType: HttpRequestType, url: string, data?: any) => {
  const response = await fetch(url, {
    method: requestType,
    headers: data && {
      'Content-Type': 'application/json',
    },
    body: data && JSON.stringify(data),
  });
  if (!response.ok) {
    throw new RequestError(response.status);
  }
  return response.json();
};

const get = (url: string) => request('GET', url);
const post = <T>(url: string, data: T) => request('POST', url, data);
const put = <T>(url: string, data: T) => request('PUT', url, data);
const patch = <T>(url: string, data: T) => request('PATCH', url, data);
const remove = (url: string) => request('DELETE', url);

export default {
  get,
  post,
  put,
  patch,
  remove,
};
