import { createServerApiClient } from '@/api/util/create-server-api-client';
import { auth } from '@/auth';
import { Main } from '@/common/components/layout/Main';
import { PageTitle } from '@/common/components/layout/PageTitle';
import { routes } from '@/common/util/routes';
import { ProfileEditor } from '@/user/components/ProfileEditor';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { LuKey } from 'react-icons/lu';

export interface Props {
  params: Promise<{ username: string }>;
}

const EditUser = async ({ params }: Readonly<Props>) => {
  const { username } = await params;
  const session = await auth();

  if (session?.user.username !== username) {
    return redirect(routes.home);
  }

  const apiClient = createServerApiClient(session);
  const user = await apiClient.getSelf();

  const availableDegrees = user.university
    ? await apiClient.getAllDegrees({
        queries: { universityId: user.university?.id },
      })
    : null;

  return (
    <Main>
      <PageTitle backHref={routes.users.byUsername(username)}>
        Editar perfil
      </PageTitle>
      <div className="mb-2 flex justify-end">
        <Link
          href={routes.users.changePasswordByUsername(username)}
          className="button-outline"
        >
          <LuKey className="mr-2 mb-1 inline" />
          Cambiar contraseña
        </Link>
      </div>
      <ProfileEditor
        session={session}
        user={user}
        availableDegrees={availableDegrees}
      />
    </Main>
  );
};

export default EditUser;
