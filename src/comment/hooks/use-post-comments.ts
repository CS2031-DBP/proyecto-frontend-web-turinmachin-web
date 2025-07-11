import { useApiClient } from '@/api/hooks/use-api-client';
import useSWR from 'swr';

export const usePostComments = (postId: string) => {
  const { apiClient } = useApiClient();

  const { data, error, isLoading, mutate } = useSWR(['comments', postId], () =>
    apiClient.getPostComments({ params: { id: postId } }),
  );

  return { comments: data?.body, isLoading, error, mutate };
};
