import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type Props = HTMLAttributes<HTMLHeadingElement>;

export const PopupFooter = ({ className, children, ...props }: Props) => (
  <div
    {...props}
    className={twMerge(
      'text-foreground-muted mt-4 text-center text-sm',
      className,
    )}
  >
    {children}
  </div>
);
