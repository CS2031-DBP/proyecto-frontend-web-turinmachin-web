'use client';

import { Session } from 'next-auth';
import { ReactNode } from 'react';
import { useApiClientProvider } from '../hooks/use-api-client-provider';
import { ApiClientContext } from './ApiClientContext';

export interface Props {
  session: Session | null;
  children?: ReactNode;
}

export const ApiClientProvider = ({ session, children }: Props) => {
  const value = useApiClientProvider({ session });
  return <ApiClientContext value={value}>{children}</ApiClientContext>;
};
