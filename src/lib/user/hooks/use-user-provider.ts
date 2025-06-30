import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { Session } from 'next-auth';
import useSWR from 'swr';
import { UserSchema } from '../schemas/user';

export interface UseUserProviderOptions {
  session: Session | null;
}

export const useUserProvider = ({ session }: UseUserProviderOptions) => {
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

  return {
    ...swr,
    user: swr.data ?? null,
  };
};
