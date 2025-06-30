'use client';

import { Button } from '@/lib/common/components/Button';
import { LuTrash } from 'react-icons/lu';
import { useDeleteUniversity } from '../hooks/use-delete-university';

export interface Props {
  universityId: string;
}

export const DeleteUniversityButton = ({ universityId }: Props) => {
  const { pending, deleteUniversity } = useDeleteUniversity(universityId);
  return (
    <Button variant="error" onClick={deleteUniversity} disabled={pending}>
      <LuTrash className="mr-2 mb-1 inline" />
      Eliminar
    </Button>
  );
};
