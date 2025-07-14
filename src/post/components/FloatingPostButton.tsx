'use client';

import { Button } from '@/common/components/Button';
import { usePopup } from '@/common/hooks/use-popup';
import { routes } from '@/common/util/routes';
import { Session } from 'next-auth';
import { usePathname } from 'next/navigation';
import { LuPlus } from 'react-icons/lu';

export const FloatingPostButton = ({ session }: { session: Session }) => {
  const { openPopup } = usePopup();
  const pathname = usePathname();

  const isChatRoute = pathname.startsWith(routes.chat.root);
  if (isChatRoute) return null;

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
    <Button
      variant="special"
      onClick={handleClick}
      className="fixed right-4 bottom-20 z-50 rounded-full p-4 sm:hidden"
    >
      <LuPlus size={28} />
    </Button>
  );
};
