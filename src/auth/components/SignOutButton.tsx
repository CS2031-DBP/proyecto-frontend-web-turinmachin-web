'use client';

import { Button } from '@/common/components/Button';
import { signOut } from 'next-auth/react';
import { LuLogOut } from 'react-icons/lu';

export const SignOutButton = () => {
  const handleClick = async () => {
    await signOut({ redirect: false });
    window.location.reload();
  };

  return (
    <Button
      onClick={handleClick}
      variant="error"
      className="flex items-center justify-center"
    >
      <LuLogOut className="mr-2 inline" />
      Salir
    </Button>
  );
};
