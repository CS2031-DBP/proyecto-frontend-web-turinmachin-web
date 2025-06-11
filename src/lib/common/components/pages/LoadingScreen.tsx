import { clsx } from 'clsx';
import type { HTMLAttributes } from 'react';
import { Spinner } from '../Spinner';

export type Props = HTMLAttributes<HTMLDivElement>;

export const LoadingScreen = ({ className, ...props }: Props) => (
  <div
    {...props}
    className={clsx(
      className,
      'flex grow items-center justify-center text-center',
    )}
  >
    <Spinner />
  </div>
);
