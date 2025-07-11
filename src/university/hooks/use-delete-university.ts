import { useApiClient } from '@/api/hooks/use-api-client';
import { usePendingCallback } from '@/common/hooks/use-pending';
import { routes } from '@/common/util/routes';
import { useRouter } from 'next/navigation';

interface UseDeleteUniversityOptions {
  universityId: string;
  onClose: () => void;
}

export const useDeleteUniversity = ({
  universityId,
  onClose,
}: UseDeleteUniversityOptions) => {
  const router = useRouter();
  const { apiClient } = useApiClient();

  const [pending, deleteUniversity] = usePendingCallback(async () => {
    await apiClient.removeUniversity({
      params: { id: universityId },
    });
    onClose();
    router.push(routes.universities.root);
  }, [apiClient, universityId, onClose]);

  return { pending, deleteUniversity };
};
