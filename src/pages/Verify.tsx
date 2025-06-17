import { useEffect, useState } from 'react';
import { RiRobot2Line } from 'react-icons/ri';
import { useNavigate, useSearchParams } from 'react-router';
import { getAxiosInstance } from '../lib/api/util/axios-instance';
import { Spinner } from '../lib/common/components/Spinner';

export const Verify = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>(
    'pending',
  );
  const navigate = useNavigate();

  useEffect(() => {
    const verificationId = searchParams.get('vid');

    if (!verificationId) {
      setStatus('error');
      return;
    }

    getAxiosInstance()
      .post('/auth/verify', { verificationId })
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'));
  }, [searchParams]);

  useEffect(() => {
    if (status === 'success') {
      const handle = setTimeout(() => (window.location.href = '/'), 1000);
      return () => clearTimeout(handle);
    }
  }, [status, navigate]);

  return (
    <div className="flex grow flex-col items-center justify-center">
      {status === 'pending' ? (
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
      ) : status === 'error' ? (
        <>
          <h2 className="text-center text-2xl font-semibold">
            Algo salió mal :(
          </h2>
          <p className="text-foreground-muted my-2">
            Quizá el link ya expiró...
          </p>
        </>
      ) : (
        <>
          <h2 className="text-center text-xl font-semibold">
            ¡Has sido verificado!
          </h2>
          <p className="text-foreground-muted my-2">
            Te estamos redirigiendo...
          </p>
        </>
      )}
    </div>
  );
};
