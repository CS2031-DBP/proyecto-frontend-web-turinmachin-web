import { routes } from '@/common/util/routes';
import { ProfilePicture } from '@/user/components/ProfilePicture';
import Link from 'next/link';
import type { HTMLAttributes } from 'react';
import type { DegreeSchema } from '../../degree/schemas/degree';
import type { UniversitySchema } from '../../university/schemas/university';
import type { UserSchema } from '../../user/schemas/user';
import { day } from '../util/dayjs';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  user: UserSchema;
  university?: UniversitySchema;
  degree?: DegreeSchema;
  fromDate?: Date;
}

export const ResourceDetails = ({
  user,
  university,
  degree,
  fromDate,
  ...props
}: Props) => {
  const universityName = university?.shortName ?? university?.name;

  const fromDateStr = day(fromDate).locale('es').fromNow();

  return (
    <div {...props}>
      <div className="flex items-center">
        <Link href={routes.users.byUsername(user.username)} className="mr-3">
          <ProfilePicture
            profilePicture={user.profilePicture}
            className="size-8"
          />
        </Link>
        <div>
          <div>
            <Link
              href={routes.users.byUsername(user.username)}
              className="font-semibold hover:underline"
            >
              {user.displayName ?? user.username}
            </Link>

            {fromDate && (
              <span className="text-foreground-muted text-sm">
                <span className="mx-2">&middot;</span>
                <span>{fromDateStr}</span>
              </span>
            )}
          </div>
          {university && (
            <div>
              <Link
                href={routes.universities.byId(university.id)}
                className="text-foreground-muted hover:underline"
              >
                {universityName}
              </Link>
              {degree && (
                <>
                  ,{' '}
                  <Link
                    href={routes.degrees.byId(degree.id)}
                    className="text-foreground-muted hover:underline"
                  >
                    {degree.name}
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
