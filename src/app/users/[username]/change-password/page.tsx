import { auth } from '@/lib/auth';
import { Main } from '@/lib/common/components/layout/Main';
import { PageTitle } from '@/lib/common/components/layout/PageTitle';
import { routes } from '@/lib/routes';
import { PasswordChanger } from '@/lib/user/components/PasswordChanger';
import { redirect } from 'next/navigation';

export interface Props {
  params: Promise<{ username: string }>;
}

const ChangeUserPassword = async ({ params }: Readonly<Props>) => {
  const { username } = await params;
  const session = await auth();

  if (session?.user.username !== username) {
    return redirect(routes.home);
  }

  return (
    <Main>
      <PageTitle backHref={routes.users.editByUsername(username)}>
        Cambiar contraseña
      </PageTitle>
      <PasswordChanger session={session} />
    </Main>
  );
};

export default ChangeUserPassword;
