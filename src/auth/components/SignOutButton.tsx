'use client';

import { Button } from '@/common/components/Button';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LuLogOut } from 'react-icons/lu';

export const SignOutButton = () => {
  const router = useRouter();

  const handleClick = async () => {
    await signOut({ redirect: false });
    router.refresh();
  };

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      className="flex items-center justify-center"
    >
      <LuLogOut className="mr-2 inline" />
      Salir
    </Button>
  );
};
