'use client';

import { Button } from '@/lib/common/components/Button';
import { usePopup } from '@/lib/common/hooks/use-popup';
import { LuTrash } from 'react-icons/lu';

export interface Props {
  degreeId: string;
}

export const DeleteDegreeButton = ({ degreeId }: Props) => {
  const { openPopup } = usePopup();

  return (
    <Button
      variant="error"
      onClick={() => openPopup('deleteDegree', { degreeId })}
    >
      <LuTrash className="mr-2 mb-1 inline" />
      Eliminar
    </Button>
  );
};
