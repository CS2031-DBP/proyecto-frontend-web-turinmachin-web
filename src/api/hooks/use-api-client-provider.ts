import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { ClientApiClient, createClientApiClient } from '../util/client';

export interface UseApiClientProviderOptions {
  session: Session | null;
}

export const useApiClientProvider = ({
  session,
}: UseApiClientProviderOptions) => {
  const apiClient = useRef<ClientApiClient | null>(null);
  const { status: sessionStatus, data: sessionData } = useSession();

  const setToken = (token: string) => {
    apiClient.current = createClientApiClient(token);
  };

  const clearToken = () => {
    apiClient.current = createClientApiClient(null);
  };

  // Avoids recreating the ref on every render
  // See https://react.dev/reference/react/useRef#avoiding-recreating-the-ref-contents
  if (!apiClient.current) {
    apiClient.current = createClientApiClient(session?.accessToken ?? null);
  }

  useEffect(() => {
    if (sessionStatus === 'loading') return;

    if (sessionData) {
      setToken(sessionData.accessToken);
    } else {
      clearToken();
    }
  }, [sessionData, sessionStatus]);

  return { apiClient: apiClient.current, setToken, clearToken };
};
