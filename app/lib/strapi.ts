import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  error?: {
    status: number;
    name: string;
    message: string;
    details: unknown;
  };
}

const createStrapiClient = (): AxiosInstance => {
  if (!process.env.NEXT_PUBLIC_STRAPI_URL) {
    throw new Error('NEXT_PUBLIC_STRAPI_URL is not defined');
  }

  if (!process.env.NEXT_PUBLIC_STRAPI_TOKEN) {
    console.warn('NEXT_PUBLIC_STRAPI_TOKEN is not defined - API requests may fail');
  }

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    },
    timeout: 60000,
  });

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      if (error.response) {
        console.error('Strapi API Error:', {
          status: error.response.status,
          data: error.response.data,
        });
      } else {
        console.error('Strapi Network Error:', error.message);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};


const strapi = {
  client: createStrapiClient(),

  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<StrapiResponse<T>>(endpoint, config);
    return response.data.data;
  },
};

export default strapi;
