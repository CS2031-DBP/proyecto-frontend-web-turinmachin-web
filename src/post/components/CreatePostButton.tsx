'use client';

import { Button } from '@/common/components/Button';
import { usePopup } from '@/common/hooks/use-popup';
import { Session } from 'next-auth';
import { LuPlus } from 'react-icons/lu';

export interface Props {
  session: Session;
}

export const CreatePostButton = ({ session, ...props }: Props) => {
  const { openPopup } = usePopup();

  const handleClick = () => {
    if (!session.user.verified) {
      openPopup('unverified', {});
    } else if (!session.user.hasUniversity) {
      openPopup('noUniversity', {});
    } else {
      openPopup('post', {});
    }
  };

  return (
    <>
      <Button
        {...props}
        variant="special"
        onClick={handleClick}
        className="flex items-center justify-center py-3 text-xl not-lg:px-0"
      >
        <LuPlus size={24} />
        <span className="ml-2 not-lg:hidden">Publicar</span>
      </Button>
    </>
  );
};
