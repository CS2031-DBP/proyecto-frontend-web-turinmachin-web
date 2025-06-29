'use client';

import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { isErrorFromAlias } from '@zodios/core';

export const ResendVerificationButton = () => {
  const { apiClient } = useApiClient();
  const [pending, handleClick] = usePendingCallback(async () => {
    try {
      await apiClient.resendVerificationEmail(undefined);
    } catch (err) {
      if (isErrorFromAlias(apiClient.api, 'resendVerificationEmail', err)) {
        // aca haz q se muestre el mensaje
        return;
      }
      throw err;
    }
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
