'use client';

import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { Session } from 'next-auth';
import { ReactNode } from 'react';
import useSWR from 'swr';
import { UserSchema } from '../schemas/user';
import { UserContext } from './UserContext';

export interface Props {
  session: Session | null;
  children?: ReactNode;
}

export const UserProvider = ({ session, children }: Props) => {
  const { apiClient } = useApiClient();

  const key = session ? ['user', session.user.username] : null;

  const swr = useSWR<UserSchema | null>(
    key,
    () => (session ? apiClient.getSelf() : null),
    {
      revalidateOnFocus: !!session,
      revalidateIfStale: !!session,
      revalidateOnReconnect: !!session,
    },
  );

  return <UserContext value={swr}>{children}</UserContext>;
};
