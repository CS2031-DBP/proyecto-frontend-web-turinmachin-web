import Image from 'next/image';
import { HTMLAttributes } from 'react';
import { LuUser } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';
import { UserSchema } from '../schemas/user';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  profilePicture: UserSchema['profilePicture'];
}

export const ProfilePicture = ({
  profilePicture,
  className,
  ...props
}: Props) => (
  <div
    {...props}
    className={twMerge(
      'bg-background-alt relative size-8 overflow-hidden rounded-full',
      className,
    )}
  >
    {profilePicture ? (
      <Image
        src={profilePicture.url}
        alt=""
        fill
        sizes="15vw"
        className="object-cover"
      />
    ) : (
      <LuUser className="text-foreground-muted absolute top-1/2 left-1/2 inline size-3/4 -translate-1/2" />
    )}
  </div>
);
