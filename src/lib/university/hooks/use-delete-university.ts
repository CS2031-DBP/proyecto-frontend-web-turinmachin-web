import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { routes } from '@/lib/routes';
import { useRouter } from 'next/navigation';

export const useDeleteUniversity = (universityId: string) => {
  const router = useRouter();
  const { apiClient } = useApiClient();

  const [pending, deleteUniversity] = usePendingCallback(async () => {
    await apiClient.removeUniversity(undefined, {
      params: { id: universityId },
    });
    router.push(routes.universities.root);
  }, [apiClient, universityId]);

  return { pending, deleteUniversity };
};
