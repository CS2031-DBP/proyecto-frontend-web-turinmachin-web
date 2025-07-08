import { useApiClient } from '@/api/hooks/use-api-client';
import useSWR from 'swr';

export const usePostComments = (postId: string) => {
  const { apiClient } = useApiClient();

  const {
    data: comments,
    error,
    isLoading,
    mutate,
  } = useSWR(['comments', postId], () =>
    apiClient.getPostComments({ params: { id: postId } }),
  );

  return { comments, isLoading, error, mutate };
};
