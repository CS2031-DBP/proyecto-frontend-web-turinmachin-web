'use client';

import { routes } from '@/lib/routes';
import { useUser } from '@/lib/user/hooks/use-user';
import { Session } from 'next-auth';
import Link from 'next/dist/client/link';
import Image from 'next/image';
import { LuUser } from 'react-icons/lu';
import { StreakIndicator } from './StreakIndicator';

export interface Props {
  session: Session;
}

export const UserCard = ({ session }: Props) => {
  const { user } = useUser();

  return (
    <Link
      href={routes.users.byUsername(session.user.username)}
      className="hover:bg-background-alt mt-4 flex rounded-lg px-3 py-2"
    >
      <div className="flex grow items-center space-x-3">
        {user?.profilePicture ? (
          <div className="relative mr-3 h-10 w-10">
            <Image
              src={user.profilePicture.url}
              alt=""
              fill
              sizes="15vw"
              placeholder={user.profilePicture.blurDataUrl ? 'blur' : 'empty'}
              blurDataURL={user.profilePicture.blurDataUrl}
              className="bg-background-alt mr-2 h-8 w-8 rounded-full object-cover"
            />
          </div>
        ) : (
          <LuUser size={36} />
        )}

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
      {user && <StreakIndicator streak={user.streak ?? 0} />}
    </Link>
  );
};
