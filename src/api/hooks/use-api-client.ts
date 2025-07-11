'use client';
import { useContext } from 'react';
import {
  ApiClientContext,
  ApiClientContextValue,
} from '../context/ApiClientContext';

export const useApiClient = () => {
  const contextValue = useContext(ApiClientContext);

  if (contextValue === null) {
    throw new Error('ApiClientContext is not initialized');
  }

  return contextValue as ApiClientContextValue;
};
