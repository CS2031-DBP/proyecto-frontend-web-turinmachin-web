'use client';

import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { Button } from '@/lib/common/components/Button';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { routes } from '@/lib/routes';
import { useRouter } from 'next/navigation';
import { LuTrash } from 'react-icons/lu';
import { UniversitySchema } from '../schemas/university';
import { UniversityWithStatsSchema } from '../schemas/university-with-stats';

export interface Props {
  university: UniversitySchema | UniversityWithStatsSchema;
}

export const DeleteUniversityButton = ({ university }: Props) => {
  const router = useRouter();
  const { apiClient } = useApiClient();

  const [pending, deleteSelf] = usePendingCallback(async () => {
    await apiClient.removeUniversity(undefined, {
      params: { id: university.id },
    });
    router.push(routes.universities.root);
  }, [apiClient, university]);

  return (
    <Button variant="error" onClick={deleteSelf} disabled={pending}>
      <LuTrash className="mr-2 mb-1 inline" />
      Eliminar
    </Button>
  );
};
