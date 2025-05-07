import axios, { AxiosInstance } from 'axios';

interface Options {
  cacheKey?: string;
}

const api = (options?: Options) => {
  if (options?.cacheKey) {
    const cacheKey = options.cacheKey;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const cachedAxios = {
        get: () => Promise.resolve(JSON.parse(cached)),
        post: () => Promise.resolve(JSON.parse(cached)),
        put: () => Promise.resolve(JSON.parse(cached)),
        delete: () => Promise.resolve(JSON.parse(cached)),
      };
      return cachedAxios as unknown as AxiosInstance;
    }
  }

  const axiosApi = axios.create();
  axiosApi.interceptors.request.use(
    async (config) => {
      config = {
        ...config,
        withCredentials: true,
        baseURL: config.url?.includes('auth/') ? '/api' : '/api/rest',
      };

      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );

  axiosApi.interceptors.response.use(
    (response) => {
      if (options?.cacheKey) {
        localStorage.setItem(options.cacheKey, JSON.stringify(response.data));
      }

      return response.data;
    },
    async (err) => {
      return Promise.reject(err);
    },
  );
  return axiosApi;
};

export default api;
