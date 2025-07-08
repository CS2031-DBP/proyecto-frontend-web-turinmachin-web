import { useApiClient } from '@/api/hooks/use-api-client';
import useSWR from 'swr';

export const useUser = (userId: string) => {
  const { apiClient } = useApiClient();
  const { data, isLoading, error, mutate } = useSWR(['users', userId], () =>
    apiClient.getUserById({ params: { id: userId } }),
  );

  const retry = async () => {
    mutate(undefined, { revalidate: true });
  };

  return { user: data, isLoading, error, retry };
};
