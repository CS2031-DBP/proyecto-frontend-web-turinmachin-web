'use client';

import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { usePopup } from '@/lib/common/hooks/use-popup';
import { isErrorFromAlias } from '@zodios/core';

export const ResendVerificationButton = () => {
  const { apiClient } = useApiClient();
  const { openPopup } = usePopup();

  const [pending, handleClick] = usePendingCallback(async () => {
    try {
      await apiClient.resendVerificationEmail(undefined);
      openPopup('verificationResend', {});
    } catch (err) {
      if (isErrorFromAlias(apiClient.api, 'resendVerificationEmail', err)) {
        openPopup('verificationResendCooldown', {});
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
