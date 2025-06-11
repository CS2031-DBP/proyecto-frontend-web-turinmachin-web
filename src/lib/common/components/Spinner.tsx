import { clsx } from 'clsx';
import type { HTMLAttributes } from 'react';

export type Props = HTMLAttributes<HTMLSpanElement>;

export const Spinner = ({ className, ...props }: Props) => (
  <span
    {...props}
    className={clsx(
      className,
      'border-foreground h-12 w-12 animate-spin rounded-full border-6 border-l-transparent',
    )}
  ></span>
);
