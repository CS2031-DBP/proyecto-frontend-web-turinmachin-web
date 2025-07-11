import { useApiClient } from '@/api/hooks/use-api-client';
import { Session } from 'next-auth';
import useSWR from 'swr';
import { SelfUserSchema } from '../schemas/self-user';

export interface UseSessionUserProviderOptions {
  session: Session | null;
}

export const useSessionUserProvider = ({
  session,
}: UseSessionUserProviderOptions) => {
  const { apiClient } = useApiClient();

  const key = session ? ['user', session.user.username] : null;

  const swr = useSWR<SelfUserSchema | null>(
    key,
    () => (session ? apiClient.getSelf().then((res) => res.body) : null),
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
