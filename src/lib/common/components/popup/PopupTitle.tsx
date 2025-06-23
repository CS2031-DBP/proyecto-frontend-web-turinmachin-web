import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export type Props = HTMLAttributes<HTMLHeadingElement>;

export const PopupTitle = ({ className, children, ...props }: Props) => (
  <h2 {...props} className={twMerge(className, 'mb-4 text-2xl font-bold')}>
    {children}
  </h2>
);
