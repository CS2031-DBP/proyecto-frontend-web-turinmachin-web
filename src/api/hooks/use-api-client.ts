'use client';

import { useContext } from 'react';
import {
  ApiClientContext,
  ApiClientContextValue,
} from '../context/ApiClientContext';

export const useApiClient = () => {
  const contextValue = useContext(ApiClientContext);

  if (Object.values(contextValue).some((val) => val === undefined)) {
    throw new Error('ApiClientContext is not properly initialized');
  }

  return contextValue as ApiClientContextValue;
};
