import { AxiosError, type AxiosRequestConfig } from 'axios';
import { z } from 'zod/v4';
import { getAxiosInstance } from './axios-instance';

export interface ApiQueryOptions {
  allowNotFound?: boolean;
  config?: AxiosRequestConfig;
}

export function apiQuery<T>(
  path: string,
  responseSchema: z.ZodType<T>,
  options: ApiQueryOptions & { allowNotFound: true },
): Promise<T | null>;

export function apiQuery<T>(
  path: string,
  responseSchema: z.ZodType<T>,
  options?: ApiQueryOptions & { allowNotFound?: false },
): Promise<T>;

export async function apiQuery<T extends z.ZodType>(
  path: string,
  responseSchema: T,
  options: ApiQueryOptions = {},
): Promise<z.output<T> | null> {
  const { allowNotFound = false, config } = options;

  try {
    const response = await getAxiosInstance().get(path, config);
    return await z.parseAsync(responseSchema, response.data);
  } catch (err: unknown) {
    if (
      allowNotFound &&
      err instanceof AxiosError &&
      err.response?.status === 404
    ) {
      return null;
    }

    throw err;
  }
}
