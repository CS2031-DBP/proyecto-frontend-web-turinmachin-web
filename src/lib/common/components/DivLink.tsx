'use client';

import { useRouter } from 'next/navigation';
import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  href: string;
}

export const DivLink = ({ href, className, children, ...props }: Props) => {
  const router = useRouter();

  return (
    <div
      {...props}
      role="button"
      onClick={() => router.push(href)}
      className={twMerge('cursor-pointer', className)}
    >
      {children}
    </div>
  );
};
