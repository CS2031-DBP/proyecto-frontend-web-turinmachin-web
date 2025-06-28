import { createServerApiClient } from '@/lib/api/util/client';
import { auth } from '@/lib/auth';
import { SignOutButton } from '@/lib/auth/components/SignOutButton';
import { Main } from '@/lib/common/components/layout/Main';
import { day } from '@/lib/common/util/dayjs';
import { PostListing } from '@/lib/post/components/PostListing';
import { routes } from '@/lib/routes';
import { ResendVerificationButton } from '@/lib/user/components/ResendVerificationButton';
import { RoleSelector } from '@/lib/user/components/RoleSelector';
import { UserSchema } from '@/lib/user/schemas/user';
import { isSessionAdmin } from '@/lib/user/util';
import { isErrorFromAlias } from '@zodios/core';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  LuCalendar,
  LuGraduationCap,
  LuInfo,
  LuShield,
  LuStar,
  LuUniversity,
} from 'react-icons/lu';

export interface Props {
  params: Promise<{ username: string }>;
}

const User = async ({ params }: Readonly<Props>) => {
  const { username } = await params;
  const session = await auth();
  const apiClient = createServerApiClient(session);

  let user: UserSchema;

  try {
    user = await apiClient.getUserByUsername({ params: { username } });
  } catch (err) {
    if (isErrorFromAlias(apiClient.api, 'getUserByUsername', err)) {
      return notFound();
    }
    throw err;
  }

  const isSelf = user.id === session?.user.id;

  const joinedAt = day(user.createdAt).locale('es').format('MMMM [de] YYYY');

  return (
    <Main>
      {isSessionAdmin(session) && (
        <div className="flex justify-end">
          <RoleSelector user={user} />
        </div>
      )}
      <div className="mt-8">
        {user.profilePicture && (
          <div className="bg-background-alt relative mx-auto mb-8 size-36 min-h-36 overflow-hidden rounded-full">
            <Image
              src={user.profilePicture.url}
              className="object-cover"
              fill
              alt=""
              sizes="50vw"
              placeholder={user.profilePicture.blurDataUrl ? 'blur' : 'empty'}
              blurDataURL={user.profilePicture.blurDataUrl}
            />
          </div>
        )}
        <div className="my-4">
          <h1 className="text-center text-3xl font-bold">
            {user.displayName ?? (
              <>
                <span className="text-foreground-muted">@</span>
                {user.username}
              </>
            )}
          </h1>
          {user.displayName && (
            <p className="text-foreground-muted mt-2 text-center text-2xl">
              @{user.username}
            </p>
          )}
        </div>
      </div>

      {!user.verified && (
        <>
          <p className="my-4 text-center text-red-300">
            <LuInfo className="mr-2 inline" />
            Cuenta no verificada
          </p>
          {isSelf && (
            <p className="text-foreground-muted my-4 text-center">
              ¡Verifica tu cuenta para poder interactuar!{' '}
              <ResendVerificationButton />
            </p>
          )}
        </>
      )}

      {user.bio && (
        <p className="my-6 text-lg whitespace-pre-wrap">{user.bio}</p>
      )}

      <ul className="text-foreground-muted my-4 flex flex-col gap-x-4 gap-y-2 not-sm:items-center lg:gap-x-8">
        <li className="flex items-center">
          <LuCalendar className="mr-2 shrink-0" />
          <span className="mr-1 not-lg:hidden">Se unió en</span>
          {joinedAt}
        </li>
        {user.role !== 'USER' &&
          (user.role === 'ADMIN' ? (
            // TODO: use palette
            <li className="flex items-center text-yellow-200">
              <LuStar className="mr-2 shrink-0" />
              Administrador
            </li>
          ) : (
            <li className="text-special flex items-center">
              <LuShield className="mr-2 shrink-0" />
              Moderador
            </li>
          ))}
        {user.university && (
          <li className="flex items-center">
            <LuUniversity className="mr-2 shrink-0" />
            <Link
              href={routes.universities.byId(user.university.id)}
              className="hover:text-foreground"
            >
              {user.university.shortName ?? user.university.name}
            </Link>
          </li>
        )}
        {user.degree && (
          <li className="flex items-center">
            <LuGraduationCap className="mr-2 shrink-0" />
            <Link
              href={routes.degrees.byId(user.degree.id)}
              className="hover:text-foreground"
            >
              {user.degree.name}
            </Link>
          </li>
        )}
      </ul>

      {isSelf && (
        <div className="flex justify-end gap-x-4 gap-y-2 not-md:flex-col">
          <Link
            href={routes.users.editByUsername(user.username)}
            className="button-normal text-nowrap"
          >
            Editar perfil
          </Link>
          <SignOutButton />
        </div>
      )}

      <hr className="border-muted my-4" />
      <PostListing session={session} queries={{ authorId: user.id }} />
    </Main>
  );
};

export default User;
