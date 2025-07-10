import { HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const TextDivider = ({ children, className, ...props }: Props) => (
  <div {...props} className={twMerge('relative my-6', className)}>
    <div className="bg-background text-foreground-muted absolute top-1/2 left-1/2 -translate-1/2 px-2">
      {children}
    </div>
    <hr className="border-muted" />
  </div>
);
