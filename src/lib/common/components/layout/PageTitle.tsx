import Link from 'next/link';
import { HTMLAttributes } from 'react';
import { LuArrowLeft } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  backHref?: string;
}

export const PageTitle = ({
  backHref,
  className,
  children,
  ...props
}: Props) => (
  <div
    className={twMerge(
      'mb-4 flex items-center text-3xl font-semibold',
      className,
    )}
    {...props}
  >
    {backHref && (
      <Link
        href={backHref}
        className="text-foreground-muted hover:text-foreground mr-2"
      >
        <LuArrowLeft className="" />
      </Link>
    )}
    <h1>{children}</h1>
  </div>
);
