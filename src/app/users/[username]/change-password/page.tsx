import { auth } from '@/auth';
import { Main } from '@/common/components/layout/Main';
import { PageTitle } from '@/common/components/layout/PageTitle';
import { routes } from '@/common/util/routes';
import { PasswordChanger } from '@/user/components/PasswordChanger';
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
