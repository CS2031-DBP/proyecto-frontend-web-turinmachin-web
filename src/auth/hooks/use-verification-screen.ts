import { useApiClient } from '@/api/hooks/use-api-client';
import { SessionUserContext } from '@/user/components/SessionUserContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';

export type Status = 'pending' | 'error';

export const useVerificationScreen = () => {
  const searchParams = useSearchParams();
  const verificationId = searchParams.get('vid');

  const router = useRouter();

  const { apiClient } = useApiClient();

  const started = useRef(false);
  const [status, setStatus] = useState<Status>('pending');

  const { mutate } = useContext(SessionUserContext);

  const doVerification = useCallback(
    async (verificationId: string) => {
      try {
        await apiClient.verify({ verificationId });
        await mutate();
        router.refresh();
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    },
    [apiClient, router, mutate],
  );

  useEffect(() => {
    if (started.current || !verificationId) return;
    started.current = true;

    doVerification(verificationId);
  }, [doVerification, verificationId]);

  return { status, verificationId };
};
