'use client';

import { Spinner } from '@/common/components/Spinner';
import { RiRobot2Line } from 'react-icons/ri';
import { useVerificationScreen } from '../hooks/use-verification-screen';

export const VerificationScreen = () => {
  const { status, verificationId } = useVerificationScreen();

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
