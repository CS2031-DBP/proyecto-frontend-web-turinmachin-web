'use client';

import { Button } from '@/lib/common/components/Button';
import { LuTrash } from 'react-icons/lu';
import { useDeleteDegree } from '../hooks/use-delete-degree';

export interface Props {
  degreeId: string;
}

export const DeleteDegreeButton = ({ degreeId }: Props) => {
  const { pending, deleteDegree } = useDeleteDegree(degreeId);

  return (
    <Button variant="error" onClick={deleteDegree} disabled={pending}>
      <LuTrash className="mr-2 mb-1 inline" /> Eliminar
    </Button>
  );
};
