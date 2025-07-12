import { createServerApiClient } from '@/api/util/server';
import { auth } from '@/auth';
import { SignOutButton } from '@/auth/components/SignOutButton';
import { Main } from '@/common/components/layout/Main';
import { day } from '@/common/util/dayjs';
import { routes } from '@/common/util/routes';
import { PostListing } from '@/post/components/PostListing';
import { ModDeleteAccountButton } from '@/user/components/ModDeleteAccountButton';
import { ResendVerificationButton } from '@/user/components/ResendVerificationButton';
import { RoleSelector } from '@/user/components/RoleSelector';
import { isSessionAdmin } from '@/user/util';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  LuCake,
  LuCalendar,
  LuGraduationCap,
  LuInfo,
  LuSettings,
  LuShield,
  LuStar,
  LuUniversity,
} from 'react-icons/lu';

export interface Props {
  params: Promise<{ username: string }>;
}

const UserPage = async ({ params }: Readonly<Props>) => {
  const { username } = await params;
  const session = await auth();
  const apiClient = createServerApiClient(session);

  const response = await apiClient.getUserByUsername({ params: { username } });
  if (response.status === 404) {
    return notFound();
  }

  const user = response.body;
  const isSelf = user.id === session?.user.id;

  const joinedAt = day(user.createdAt).locale('es').format('MMMM [de] YYYY');
  const birthdayStr = day(user.birthday).locale('es').format('D [de] MMMM');

  return (
    <Main>
      {isSessionAdmin(session) && !isSelf && (
        <div className="flex justify-end space-x-4">
          <ModDeleteAccountButton user={user} />
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
        <li className="flex items-center">
          <LuCake className="mr-2 shrink-0" />
          {birthdayStr}
        </li>
        {user.role !== 'USER' &&
          (user.role === 'ADMIN' ? (
            <li className="text-important flex items-center">
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
            className="button-outline text-nowrap"
          >
            <LuSettings className="mr-2 inline" />
            Editar cuenta
          </Link>
          <SignOutButton />
        </div>
      )}

      <TabGroup className="mt-8">
        <TabList className="grid grid-cols-2 overflow-hidden rounded font-semibold">
          <Tab className="data-selected:text-special border-muted data-hover:bg-foreground/5 data-selected:border-special border-b px-6 py-4">
            Publicaciones
          </Tab>
          <Tab className="data-selected:text-special border-muted data-hover:bg-foreground/5 data-selected:border-special border-b px-6 py-4">
            Votadas
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PostListing session={session} queries={{ authorId: user.id }} />
          </TabPanel>
          <TabPanel>
            <PostListing session={session} queries={{ upvotedBy: user.id }} />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Main>
  );
};

export default UserPage;
