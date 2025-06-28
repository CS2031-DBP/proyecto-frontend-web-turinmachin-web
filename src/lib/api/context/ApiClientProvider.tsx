'use client';

import { Zodios } from '@zodios/core';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { ReactNode, useEffect, useRef } from 'react';
import { api, ApiClient } from '../util/client';
import { ApiClientContext } from './ApiClientContext';

export interface Props {
  session: Session | null;
  children?: ReactNode;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable not set');
}

export const ApiClientProvider = ({ session, children }: Props) => {
  const apiClient = useRef<ApiClient | null>(null);
  const { status: sessionStatus, data: sessionData } = useSession();

  const setToken = (token: string) => {
    if (!apiClient.current) throw new Error('apiClient is null');

    apiClient.current.axios.defaults.headers.Authorization = `Bearer ${token}`;
  };

  const clearToken = () => {
    if (!apiClient.current) throw new Error('apiClient is null');

    apiClient.current.axios.defaults.headers.Authorization = null;
  };

  // Avoids recreating the ref on every render
  // See https://react.dev/reference/react/useRef#avoiding-recreating-the-ref-contents
  if (!apiClient.current) {
    apiClient.current = new Zodios(apiUrl, api);
    if (session) {
      setToken(session.accessToken);
    }
  }

  useEffect(() => {
    if (sessionStatus === 'loading') return;

    if (sessionData) {
      setToken(sessionData.accessToken);
    } else {
      clearToken();
    }
  }, [sessionData, sessionStatus]);

  return (
    <ApiClientContext
      value={{ apiClient: apiClient.current, setToken, clearToken }}
    >
      {children}
    </ApiClientContext>
  );
};
