import { sessionApiClient } from '@/lib/api/util/client';
import { auth } from '@/lib/auth';
import { Main } from '@/lib/common/components/layout/Main';
import { routes } from '@/lib/routes';
import { ProfileEditor } from '@/lib/user/components/ProfileEditor';
import { redirect } from 'next/navigation';

export interface Props {
  params: Promise<{ username: string }>;
}

const EditUser = async ({ params }: Readonly<Props>) => {
  const { username } = await params;
  const session = await auth();

  if (session?.user.username !== username) {
    return redirect(routes.home);
  }

  const apiClient = sessionApiClient(session);
  const user = await apiClient.getSelf();

  const availableDegrees = user.university
    ? await apiClient.getDegrees({
        queries: { universityId: user.university?.id },
      })
    : null;

  return (
    <Main>
      <h1 className="mb-4 text-3xl font-semibold">Editar perfil</h1>
      <ProfileEditor
        session={session}
        user={user}
        availableDegrees={availableDegrees}
      />
    </Main>
  );
};

export default EditUser;
