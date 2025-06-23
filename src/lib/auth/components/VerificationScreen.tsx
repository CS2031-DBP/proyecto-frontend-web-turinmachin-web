'use client';

import { Spinner } from '@/lib/common/components/Spinner';
import { Session } from 'next-auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RiRobot2Line } from 'react-icons/ri';
import { useSessionApiClient } from '../schemas/hooks/use-session-api-client';

export interface Props {
  session: Session;
}

type Status = 'pending' | 'error';

export const VerificationScreen = ({ session }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const apiClient = useSessionApiClient(session);

  const started = useRef(false);
  const [status, setStatus] = useState<Status>('pending');

  const verificationId = searchParams.get('vid');

  const doVerification = useCallback(
    async (verificationId: string) => {
      try {
        await apiClient.verify({ verificationId });
        router.refresh();
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    },
    [apiClient, router],
  );

  useEffect(() => {
    if (started.current || !verificationId) return;
    started.current = true;

    doVerification(verificationId);
  }, [doVerification, verificationId]);

  if (!verificationId) {
    return (
      <p className="my-8 text-center">¡El link al que entraste es inválido!</p>
    );
  }

  if (status === 'error') {
    return (
      <>
        <h2 className="text-center text-2xl font-semibold">
          Algo salió mal :(
        </h2>
        <p className="text-foreground-muted my-2">Quizá el link ya expiró...</p>
      </>
    );
  }

  return (
    <>
      <p className="text-foreground-muted text-center">
        Beep boop... <RiRobot2Line size={24} className="ml-2 inline" />
      </p>
      <h2 className="my-2 text-center text-xl font-semibold">
        ¡Estamos verificando tu cuenta!
      </h2>
      <div className="my-8 flex items-center text-center">
        <Spinner />
      </div>
    </>
  );
};
