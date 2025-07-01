import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { routes } from '@/lib/routes';
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
    await apiClient.removeUniversity(undefined, {
      params: { id: universityId },
    });
    onClose();
    router.push(routes.universities.root);
  }, [apiClient, universityId, onClose]);

  return { pending, deleteUniversity };
};
