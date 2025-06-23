import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type Props = HTMLAttributes<HTMLDivElement>;

export const Main = ({ className, children, ...props }: Props) => (
  <main
    {...props}
    tabIndex={0}
    role="main"
    autoFocus
    className={twMerge(
      'border-muted flex grow flex-col overflow-y-scroll border-x px-8 py-6 focus:outline-none',
      className,
    )}
  >
    {children}
  </main>
);
