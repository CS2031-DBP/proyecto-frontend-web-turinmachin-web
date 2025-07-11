'use client';
import { useApiClient } from '@/api/hooks/use-api-client';
import { usePendingCallback } from '@/common/hooks/use-pending';
import { usePopup } from '@/common/hooks/use-popup';

export const ResendVerificationButton = () => {
  const { apiClient } = useApiClient();
  const { openPopup } = usePopup();

  const [pending, handleClick] = usePendingCallback(async () => {
    const res = await apiClient.resendVerificationEmail(undefined);

    if (res.status === 429) {
      openPopup('verificationResendCooldown', {});
      return;
    }

    openPopup('verificationResend', {});
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
