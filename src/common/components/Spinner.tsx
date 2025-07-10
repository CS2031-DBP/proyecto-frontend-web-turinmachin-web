import type { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type Props = HTMLAttributes<HTMLSpanElement>;

export const Spinner = ({ className, ...props }: Props) => (
  <div
    {...props}
    className={twMerge(
      'border-foreground inline-block size-12 animate-spin rounded-full border-6 border-l-transparent',
      className,
    )}
  ></div>
);
