'use client';

import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { Button } from '@/lib/common/components/Button';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { routes } from '@/lib/routes';
import { useRouter } from 'next/navigation';
import { LuTrash } from 'react-icons/lu';
import { DegreeSchema } from '../schemas/degree';

export interface Props {
  degree: DegreeSchema;
}

export const DeleteDegreeButton = ({ degree }: Props) => {
  const router = useRouter();
  const { apiClient } = useApiClient();

  const [pending, deleteSelf] = usePendingCallback(async () => {
    await apiClient.removeDegree(undefined, {
      params: { id: degree.id },
    });
    router.push(routes.degrees.root);
  }, [apiClient, degree]);

  return (
    <Button variant="outline" onClick={deleteSelf} disabled={pending}>
      <LuTrash className="mr-2 mb-1 inline" /> Eliminar
    </Button>
  );
};
