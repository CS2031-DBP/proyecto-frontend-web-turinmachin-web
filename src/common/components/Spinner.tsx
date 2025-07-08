import type { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type Props = HTMLAttributes<HTMLSpanElement>;

export const Spinner = ({ className, ...props }: Props) => (
  <span
    {...props}
    className={twMerge(
      'border-foreground size-12 animate-spin rounded-full border-6 border-l-transparent',
      className,
    )}
  ></span>
);
