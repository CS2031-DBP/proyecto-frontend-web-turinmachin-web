'use client';
import { createContext } from 'react';
import { ClientApiClient } from '../util/client';

export interface ApiClientContextValue {
  apiClient: ClientApiClient;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const ApiClientContext = createContext<ApiClientContextValue | null>(
  null,
);
