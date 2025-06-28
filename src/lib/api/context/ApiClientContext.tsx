'use client';

import { createContext } from 'react';
import { ApiClient } from '../util/client';

export interface ApiClientContextValue {
  apiClient: ApiClient;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const ApiClientContext = createContext<Partial<ApiClientContextValue>>(
  {},
);
