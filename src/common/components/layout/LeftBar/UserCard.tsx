'use client';

import { routes } from '@/common/util/routes';
import { ProfilePicture } from '@/user/components/ProfilePicture';
import { useSessionUser } from '@/user/hooks/use-session-user';
import { Session } from 'next-auth';
import Link from 'next/dist/client/link';
import { StreakIndicator } from './StreakIndicator';

export interface Props {
  session: Session;
}

export const UserCard = ({ session }: Props) => {
  const { user } = useSessionUser();

  return (
    <Link
      href={routes.users.byUsername(session.user.username)}
      className="hover:bg-background-alt mt-4 flex rounded-lg px-3 py-2"
    >
      <div className="flex grow items-center space-x-3">
        <ProfilePicture
          profilePicture={user?.profilePicture}
          className="size-10 min-w-10"
        />

        <div className="not-md:hidden">
          <p className="font-semibold">
            {session.user.displayName ?? session.user.username}
          </p>
          {session.user.displayName && (
            <p className="text-foreground-muted text-sm">
              @{session.user.username}
            </p>
          )}
        </div>
      </div>
      {user && (
        <StreakIndicator
          streak={user.streak ?? 0}
          streakSafe={user.streakSafe}
        />
      )}
    </Link>
  );
};
