'use client';
import { Button } from '@/lib/common/components/Button';
import { usePopup } from '@/lib/common/hooks/use-popup';
import { LuTrash } from 'react-icons/lu';

export const DeleteAccountButton = () => {
  const { openPopup } = usePopup();

  return (
    <Button
      type="button"
      variant="error"
      onClick={() => openPopup('deleteAccount', {})}
    >
      <LuTrash className="mr-2 mb-1 inline" />
      Eliminar cuenta
    </Button>
  );
};
