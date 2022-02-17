import { useState } from 'react';
import RequestError from '../errors/RequestError';
import CommunicationError from '../errors/CommunicationError';

type UpdateMethods = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

function useUpdate<T>() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const [updatedData, setUpdatedData] = useState<T>();

  const sendHttpRequest = async (method: UpdateMethods, url: string, data?: T | null) => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: data && JSON.stringify(data),
      });
      if (!response.ok) {
        setError(new RequestError(response.status));
        return;
      }
      setUpdatedData(await response.json());
    } catch (e: any) {
      setError(new CommunicationError(e));
    } finally {
      setLoading(false);
    }
  };

  const post = (data: any, url: string) => sendHttpRequest('POST', url, data);

  const put = (data: any, url: string) => sendHttpRequest('PUT', url, data);

  const patch = (data: any, url: string) => sendHttpRequest('PATCH', url, data);

  const remove = (url: string) => sendHttpRequest('DELETE', url, null);

  return {
    loading,
    error,
    post,
    put,
    patch,
    remove,
    data: updatedData,
  };
}

export default useUpdate;
