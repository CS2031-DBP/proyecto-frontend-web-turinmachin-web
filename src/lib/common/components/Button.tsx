import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'special' | 'normal' | 'outline';
}

export const Button = ({
  variant = 'normal',
  className,
  children,
  ...props
}: Props) => (
  <button
    {...props}
    className={twMerge(
      variant === 'special' && 'button-special',
      variant === 'normal' && 'button-normal',
      variant === 'outline' && 'button-outline',
      className,
    )}
  >
    {children}
  </button>
);
