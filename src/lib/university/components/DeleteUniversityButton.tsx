'use client';

import { useSessionApiClient } from '@/lib/auth/schemas/hooks/use-session-api-client';
import { Button } from '@/lib/common/components/Button';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { routes } from '@/lib/routes';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { LuTrash } from 'react-icons/lu';
import { UniversitySchema } from '../schemas/university';

export interface Props {
  session: Session;
  university: UniversitySchema;
}

export const DeleteUniversityButton = ({ session, university }: Props) => {
  const router = useRouter();
  const apiClient = useSessionApiClient(session);

  const [pending, deleteSelf] = usePendingCallback(async () => {
    await apiClient.removeUniversity(undefined, {
      params: { id: university.id },
    });
    router.push(routes.universities.root);
  }, [apiClient, university]);

  return (
    <Button variant="outline" onClick={deleteSelf} disabled={pending}>
      <LuTrash className="mr-2 mb-1 inline" /> Eliminar
    </Button>
  );
};
