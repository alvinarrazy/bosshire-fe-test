import axios, { AxiosError } from 'axios';

const HTTP_API_DOMAIN = 'https://fakestoreapi.com';

const httpApi = (token?: string) => {
  const axiosApi = axios.create();
  axiosApi.interceptors.request.use(
    async (config) => {
      config = {
        ...config,
        baseURL: HTTP_API_DOMAIN,
      };

      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['Content-Type'] = 'application/json';
      config.headers['Accept'] = 'application/json';

      // For debugging purposes
      console.info('\x1b[35m[API REQUEST]\x1b[0m', config.url, config.data);

      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );

  axiosApi.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError) => {
      //Handle error
      return Promise.reject(error);
    },
  );
  return axiosApi;
};

export default httpApi;
