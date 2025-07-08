import { useApiClient } from '@/api/hooks/use-api-client';
import { usePendingCallback } from '@/common/hooks/use-pending';
import { routes } from '@/common/util/routes';
import { useRouter } from 'next/navigation';

export const useDeletePost = (postId: string) => {
  const router = useRouter();
  const { apiClient } = useApiClient();

  const [pending, deletePost] = usePendingCallback(async () => {
    await apiClient.deletePost(undefined, { params: { id: postId } });
    router.push(routes.home);
  }, [router, apiClient, postId]);

  return { pending, deletePost };
};
