'use client';

import { createContext } from 'react';
import { ApiClient } from '../util/api';

export interface ApiClientContextValue {
  apiClient: ApiClient;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const ApiClientContext = createContext<ApiClientContextValue | null>(
  null,
);
