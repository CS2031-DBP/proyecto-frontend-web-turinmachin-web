'use client';

import { Button } from '@/common/components/Button';
import { usePopup } from '@/common/hooks/use-popup';
import { LuLogIn } from 'react-icons/lu';

export const FloatingLoginButton = () => {
  const { openPopup } = usePopup();

  return (
    <Button
      variant="special"
      onClick={() => openPopup('login', {})}
      className="fixed right-4 bottom-20 z-50 rounded-full p-4 sm:hidden"
    >
      <LuLogIn size={28} />
    </Button>
  );
};
