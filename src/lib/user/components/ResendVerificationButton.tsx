'use client';

import { useSessionApiClient } from '@/lib/auth/schemas/hooks/use-session-api-client';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { Session } from 'next-auth';

export interface Props {
  session: Session;
}

export const ResendVerificationButton = ({ session }: Props) => {
  const apiClient = useSessionApiClient(session);
  const [pending, handleClick] = usePendingCallback(async () => {
    await apiClient.resendVerificationEmail(undefined);
  }, []);

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className="text-special underline-special disabled:text-foreground-mute enabled:hover:underline"
    >
      Reenviar correo
    </button>
  );
};
