'use client';

import { Button } from '@/lib/common/components/Button';
import { usePopup } from '@/lib/common/hooks/use-popup';
import { Session } from 'next-auth';
import { LuPlus } from 'react-icons/lu';

export interface Props {
  session: Session;
}

export const CreatePostButton = ({ session, ...props }: Props) => {
  const { openPopup } = usePopup();

  return (
    <>
      <Button
        {...props}
        variant="special"
        onClick={() => openPopup('post')}
        disabled={!session.user.verified}
        // TODO: change for a more obvious message. This doesn't work as well on mobile
        title={
          session.user.verified
            ? undefined
            : '¡Debes verificar tu cuenta primero!'
        }
        className="flex items-center justify-center py-3 text-xl not-sm:px-0"
      >
        <LuPlus size={24} />
        <span className="ml-2 not-sm:hidden">Publicar</span>
      </Button>
    </>
  );
};
