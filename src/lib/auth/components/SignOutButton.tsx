import { signOut } from '@/lib/auth';
import { Button } from '@/lib/common/components/Button';
import { ButtonHTMLAttributes } from 'react';
import { LuLogOut } from 'react-icons/lu';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  options?: {
    redirectTo?: string;
    redirect?: boolean;
  };
}

export const SignOutButton = ({ options, ...props }: Props) => {
  const handleCLick = async () => {
    'use server';
    await signOut(options);
  };

  return (
    <Button
      {...props}
      onClick={handleCLick}
      variant="outline"
      className="flex items-center justify-center"
    >
      <LuLogOut className="mr-2 inline" />
      Salir
    </Button>
  );
};
