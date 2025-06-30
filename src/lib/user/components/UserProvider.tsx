'use client';

import { Session } from 'next-auth';
import { ReactNode } from 'react';
import { useUserProvider } from '../hooks/use-user-provider';
import { UserContext } from './UserContext';

export interface Props {
  session: Session | null;
  children?: ReactNode;
}

export const UserProvider = ({ session, children }: Props) => {
  const value = useUserProvider({ session });
  return <UserContext value={value}>{children}</UserContext>;
};
