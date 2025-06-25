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
  console.log(session.user.hasUniversity);

  return (
    <>
      <Button
        {...props}
        variant="special"
        onClick={() => openPopup('post')}
        disabled={!session.user.verified || !session.user.hasUniversity}
        // TODO: change for a more obvious message. This doesn't work as well on mobile
        title={
          !session.user.verified
            ? '¡Debes verificar tu cuenta primero!'
            : !session.user.hasUniversity
              ? 'Debes estar asociado a una universidad para publicar.'
              : undefined
        }
        className="flex items-center justify-center py-3 text-xl not-sm:px-0"
      >
        <LuPlus size={24} />
        <span className="ml-2 not-sm:hidden">Publicar</span>
      </Button>
    </>
  );
};
