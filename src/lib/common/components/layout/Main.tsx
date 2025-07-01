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
      'flex grow flex-col overflow-y-scroll px-3 py-6 focus:outline-none sm:px-8',
      className,
    )}
  >
    {children}
  </main>
);
