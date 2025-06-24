'use client';

import { useSessionApiClient } from '@/lib/auth/schemas/hooks/use-session-api-client';
import { Button } from '@/lib/common/components/Button';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { routes } from '@/lib/routes';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { LuTrash } from 'react-icons/lu';
import { DegreeSchema } from '../schemas/degree';

export interface Props {
  session: Session;
  degree: DegreeSchema;
}

export const DeleteDegreeButton = ({ session, degree }: Props) => {
  const router = useRouter();
  const apiClient = useSessionApiClient(session);

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
