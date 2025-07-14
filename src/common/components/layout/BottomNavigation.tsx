'use client';

import { routes } from '@/common/util/routes';
import { Session } from 'next-auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';
import {
  LuGraduationCap,
  LuHouse,
  LuMessagesSquare,
  LuSearch,
  LuUniversity,
  LuUser,
} from 'react-icons/lu';
import { twJoin } from 'tailwind-merge';

type Link =
  | {
      to: string;
      Icon: IconType;
      exact?: boolean;
      sessionOnly?: boolean;
    }
  | {
      to: (session: Session | null) => string;
      Icon: IconType;
      exact?: boolean;
      sessionOnly: false;
    }
  | {
      to: (session: Session) => string;
      Icon: IconType;
      exact?: boolean;
      sessionOnly: true;
    };

const links: Link[] = [
  {
    to: routes.home,
    Icon: LuHouse,
    exact: true,
  },
  {
    to: routes.posts.root,
    Icon: LuSearch,
    exact: true,
  },
  {
    to: routes.universities.root,
    Icon: LuUniversity,
    exact: true,
  },
  {
    to: routes.degrees.root,
    Icon: LuGraduationCap,
    exact: true,
  },
  {
    to: routes.chat.root,
    Icon: LuMessagesSquare,
    sessionOnly: true,
  },
  {
    to: (session) =>
      session ? routes.users.byUsername(session.user.username) : '',
    Icon: LuUser,
    sessionOnly: true,
  },
];

export const BottomNavigation = ({ session }: { session: Session | null }) => {
  const pathname = usePathname();

  return (
    <nav className="border-muted bg-background fixed bottom-0 z-50 flex w-full items-center justify-around border-t py-2 shadow sm:hidden">
      {links
        .filter((link) => !link.sessionOnly || session)
        .map((link) => {
          const toValue =
            typeof link.to === 'function' ? link.to(session!) : link.to;

          const isActive = link.exact
            ? pathname === toValue
            : pathname.startsWith(toValue);

          return (
            <Link
              key={toValue}
              href={toValue}
              className={twJoin(
                'text-foreground-muted flex flex-col items-center text-xs transition-colors',
                isActive && 'text-special',
              )}
            >
              <link.Icon size={22} />
            </Link>
          );
        })}
    </nav>
  );
};
