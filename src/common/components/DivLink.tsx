'use client';

import { useRouter } from 'next/navigation';
import { HTMLAttributes, MouseEvent } from 'react';
import { twMerge } from 'tailwind-merge';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  href: string;
}

export const DivLink = ({ href, className, children, ...props }: Props) => {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!(e.target instanceof Element) || !e.target.closest('a, button, img')) {
      router.push(href);
    }
  };

  return (
    <div
      {...props}
      role="button"
      onClick={handleClick}
      className={twMerge('cursor-pointer', className)}
    >
      {children}
    </div>
  );
};
