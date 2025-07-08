import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

export interface Props extends Omit<LinkProps, 'href'> {
  href?: string;
  children?: ReactNode;
}

export const MaybeLink = ({ href, children, ...props }: Props) =>
  href ? (
    <Link {...props} href={href}>
      {children}
    </Link>
  ) : (
    children
  );
