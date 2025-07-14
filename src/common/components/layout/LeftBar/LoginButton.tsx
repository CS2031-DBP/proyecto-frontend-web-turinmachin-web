'use client';

import { usePopup } from '@/common/hooks/use-popup';
import { ButtonHTMLAttributes } from 'react';
import { LuLogIn } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';
import { Button } from '../../Button';

export type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const LoginButton = ({ className, ...props }: Props) => {
  const { openPopup } = usePopup();

  return (
    <Button
      {...props}
      onClick={() => openPopup('login', {})}
      variant="special"
      className={twMerge(
        'flex items-center justify-center px-1 py-3 text-xl not-sm:px-0',
        className,
      )}
    >
      <LuLogIn size={24} />
      <span className="ml-2 not-lg:hidden">Iniciar sesión</span>
    </Button>
  );
};
