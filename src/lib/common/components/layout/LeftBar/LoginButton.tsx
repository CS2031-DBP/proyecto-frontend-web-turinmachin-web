'use client';

import { usePopup } from '@/lib/common/hooks/use-popup';
import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '../../Button';

export type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const LoginButton = ({ className, ...props }: Props) => {
  const { openPopup } = usePopup();

  return (
    <Button
      {...props}
      onClick={() => openPopup('login')}
      variant="special"
      className={twMerge('w-full py-3 text-xl', className)}
    >
      Iniciar sesión
    </Button>
  );
};
