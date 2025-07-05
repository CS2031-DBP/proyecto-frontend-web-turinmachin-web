'use client';

import { Session } from 'next-auth';
import { ReactNode } from 'react';
import { useSessionUserProvider } from '../hooks/use-session-user-provider';
import { SessionUserContext } from './SessionUserContext';

export interface Props {
  session: Session | null;
  children?: ReactNode;
}

export const SessionUserProvider = ({ session, children }: Props) => {
  const value = useSessionUserProvider({ session });
  return <SessionUserContext value={value}>{children}</SessionUserContext>;
};
