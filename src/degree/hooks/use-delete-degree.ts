import { useApiClient } from '@/api/hooks/use-api-client';
import { usePendingCallback } from '@/common/hooks/use-pending';
import { routes } from '@/common/util/routes';
import { useRouter } from 'next/navigation';

interface UseDeleteDegreeOptions {
  degreeId: string;
  onClose: () => void;
}

export const useDeleteDegree = ({
  degreeId,
  onClose,
}: UseDeleteDegreeOptions) => {
  const router = useRouter();
  const { apiClient } = useApiClient();

  const [pending, deleteDegree] = usePendingCallback(async () => {
    await apiClient.removeDegree({ params: { id: degreeId } });
    onClose();
    router.push(routes.degrees.root);
  }, [apiClient, degreeId, onClose]);

  return { pending, deleteDegree };
};
