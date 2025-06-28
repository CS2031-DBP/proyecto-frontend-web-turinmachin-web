'use client';

import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';

export const ResendVerificationButton = () => {
  const { apiClient } = useApiClient();
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
