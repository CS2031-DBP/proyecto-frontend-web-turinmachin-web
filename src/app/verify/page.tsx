import { auth } from '@/lib/auth';
import { VerificationScreen } from '@/lib/auth/components/VerificationScreen';
import { Main } from '@/lib/common/components/layout/Main';
import { routes } from '@/lib/routes';
import Link from 'next/link';
import { LuPartyPopper } from 'react-icons/lu';

const Verify = async () => {
  const session = await auth();

  if (!session) {
    return (
      <Main className="justify-center">
        <p className="my-8 text-center">
          ¡Debes estar logeado para verificarte!
        </p>
      </Main>
    );
  }

  if (session.user.verified) {
    return (
      <Main className="flex grow flex-col items-center justify-center">
        <LuPartyPopper className="text-foreground-muted mx-auto mb-4 size-12" />
        <h2 className="text-center text-xl font-semibold">
          ¡Has sido verificado!
        </h2>
        <p className="text-foreground-muted my-2">
          No olvides{' '}
          <Link
            href={routes.users.editByUsername(session.user.username)}
            className="text-special underline-special hover:underline"
          >
            especificar tu carrera
          </Link>{' '}
          en tu perfil ;)
        </p>
      </Main>
    );
  }

  return (
    <Main className="flex grow flex-col items-center justify-center">
      <VerificationScreen session={session} />
    </Main>
  );
};

export default Verify;
