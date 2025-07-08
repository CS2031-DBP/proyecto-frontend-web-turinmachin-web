import { useApiClient } from '@/api/hooks/use-api-client';
import { useSWRConfig } from 'swr';

export interface UseCommentControlsOptions {
  postId: string;
  commentId: string;
}

export const useCommentControls = ({
  postId,
  commentId,
}: UseCommentControlsOptions) => {
  const { mutate } = useSWRConfig();
  const { apiClient } = useApiClient();

  const deleteSelf = async () => {
    await apiClient.deletePostComment(undefined, {
      params: { id: postId, commentId },
    });
    await mutate(['comments', postId]);
    await mutate(['posts', postId]);
  };

  return { deleteSelf };
};
