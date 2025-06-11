import axios, { type AxiosInstance } from 'axios';

let instance: AxiosInstance | null = null;

export const getAxiosInstance = () => {
  if (instance === null) {
    const baseURL = import.meta.env.VITE_API_URL;
    if (!baseURL) {
      throw new Error('Missing VITE_API_URL variable');
    }

    const token = localStorage.getItem('token');
    instance = axios.create({
      baseURL,
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    });
  }
  return instance;
};
