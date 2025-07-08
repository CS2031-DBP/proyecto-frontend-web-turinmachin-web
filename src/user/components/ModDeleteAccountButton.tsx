'use client';
import { Button } from '@/common/components/Button';
import { usePopup } from '@/common/hooks/use-popup';
import { LuTrash } from 'react-icons/lu';
import { UserSchema } from '../schemas/user';

export interface Props {
  user: UserSchema;
}

export const ModDeleteAccountButton = ({ user }: Props) => {
  const { openPopup } = usePopup();

  return (
    <Button
      type="button"
      variant="error"
      onClick={() => openPopup('modDeleteAccount', { user })}
    >
      <LuTrash className="mr-2 mb-1 inline" />
      Eliminar @{user.username}
    </Button>
  );
};
