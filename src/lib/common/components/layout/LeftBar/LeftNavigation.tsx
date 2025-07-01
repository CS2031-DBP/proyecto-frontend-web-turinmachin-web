'use client';

import { routes } from '@/lib/routes';
import { Session } from 'next-auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HTMLAttributes } from 'react';
import { IconType } from 'react-icons';
import {
  LuGraduationCap,
  LuHouse,
  LuSearch,
  LuUniversity,
  LuUser,
} from 'react-icons/lu';
import { twJoin, twMerge } from 'tailwind-merge';

type Link =
  | {
      to: string;
      label: string;
      Icon: IconType;
      exact?: boolean;
      sessionOnly?: boolean;
    }
  | {
      to: (session: Session | null) => string;
      label: string;
      Icon: IconType;
      exact?: boolean;
      sessionOnly: false;
    }
  | {
      to: (session: Session) => string;
      label: string;
      Icon: IconType;
      exact?: boolean;
      sessionOnly: true;
    };

const links: Link[] = [
  {
    to: routes.home,
    label: 'Inicio',
    Icon: LuHouse,
    exact: true,
  },
  {
    to: routes.posts.root,
    label: 'Explorar',
    Icon: LuSearch,
    exact: true,
  },
  {
    to: routes.universities.root,
    label: 'Universidades',
    Icon: LuUniversity,
    exact: true,
  },
  {
    to: routes.degrees.root,
    label: 'Carreras',
    Icon: LuGraduationCap,
    exact: true,
  },
  {
    to: (session) =>
      session ? routes.users.byUsername(session.user.username) : '',
    label: 'Mi cuenta',
    Icon: LuUser,
    sessionOnly: true,
  },
];

export interface Props extends HTMLAttributes<HTMLUListElement> {
  session: Session | null;
}

export const LeftNavigation = ({ session, className, ...props }: Props) => {
  const pathname = usePathname();

  return (
    <nav className={twMerge(className, 'block grow')} {...props}>
      {links
        .filter((link) => !link.sessionOnly || session !== null)
        .map((link) => {
          const toValue =
            typeof link.to === 'function' ? link.to(session!) : link.to;

          const isActive = link.exact
            ? pathname === link.to
            : pathname.startsWith(toValue);

          return (
            <Link
              key={toValue}
              href={toValue}
              className={twJoin(
                'hover:bg-background-alt my-3 flex items-center justify-start rounded-full px-4 py-2.5 text-xl text-nowrap transition-colors duration-400 ease-in-out not-md:justify-center not-md:px-2',
                isActive && 'text-special',
              )}
            >
              <link.Icon
                className={twJoin(isActive && 'fill-current')}
                size={30}
              />
              <div className="ml-2 not-md:hidden">{link.label}</div>
            </Link>
          );
        })}
    </nav>
  );
};
