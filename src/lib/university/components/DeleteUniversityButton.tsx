'use client';

import { Button } from '@/lib/common/components/Button';
import { usePopup } from '@/lib/common/hooks/use-popup';
import { LuTrash } from 'react-icons/lu';

export interface Props {
  universityId: string;
}

export const DeleteUniversityButton = ({ universityId }: Props) => {
  const { openPopup } = usePopup();

  return (
    <Button
      variant="error"
      onClick={() => openPopup('deleteUniversity', { universityId })}
    >
      <LuTrash className="mr-2 mb-1 inline" />
      Eliminar
    </Button>
  );
};
