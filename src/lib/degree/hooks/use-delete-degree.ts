import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { routes } from '@/lib/routes';
import { useRouter } from 'next/router';

export const useDeleteDegree = (degreeId: string) => {
  const router = useRouter();
  const { apiClient } = useApiClient();

  const [pending, deleteDegree] = usePendingCallback(async () => {
    await apiClient.removeDegree(undefined, {
      params: { id: degreeId },
    });
    router.push(routes.degrees.root);
  }, [apiClient, degreeId]);

  return { pending, deleteDegree };
};
