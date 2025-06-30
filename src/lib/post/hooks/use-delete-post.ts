import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { routes } from '@/lib/routes';
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
