import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

export type Status = 'pending' | 'error';

export const useVerificationScreen = () => {
  const searchParams = useSearchParams();
  const verificationId = searchParams.get('vid');

  const router = useRouter();

  const { apiClient } = useApiClient();

  const started = useRef(false);
  const [status, setStatus] = useState<Status>('pending');

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

  return { status, verificationId };
};
