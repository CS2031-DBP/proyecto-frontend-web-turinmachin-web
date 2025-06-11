import clsx from 'clsx';
import dayjs from 'dayjs';
import type { HTMLAttributes } from 'react';
import { NavLink } from 'react-router';
import type { DegreeSchema } from '../../degree/schemas/degree';
import type { UniversitySchema } from '../../university/schemas/university';
import type { UserSchema } from '../../user/schemas/user';

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
  className,
  ...props
}: Props) => {
  const universityName = university?.shortName ?? university?.name;

  const fromDateStr = dayjs(fromDate).locale('es').fromNow();

  return (
    <div {...props} className={clsx('mb-2 h-8', className)}>
      <NavLink to={`/users/@${user.username}`} className="hover:underline">
        {user.profilePicture && (
          <img
            src={user.profilePicture.url}
            alt=""
            className="bg-background-alt mr-2 inline h-8 w-8 rounded-full object-cover"
          />
        )}
        <span className="font-semibold">
          {user.displayName ?? user.username}
        </span>
      </NavLink>
      {university && (
        <>
          <span className="mx-2"> &middot;</span>
          <NavLink
            to={`/universities/${university.id}`}
            className="hover:underline"
          >
            {universityName}
          </NavLink>
          {degree && (
            <>
              ,{' '}
              <NavLink to={`/degrees/${degree.id}`} className="hover:underline">
                {degree.name}
              </NavLink>
            </>
          )}
        </>
      )}
      {fromDate && (
        <>
          <span className="text-foreground-muted mx-2"> &middot;</span>
          <span className="text-foreground-muted"> {fromDateStr}</span>
        </>
      )}
    </div>
  );
};
