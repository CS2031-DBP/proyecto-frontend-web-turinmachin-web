'use client';
import { usePendingCallback } from '@/common/hooks/use-pending';
import { usePopup } from '@/common/hooks/use-popup';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AuthCredentialsSchema } from '../schemas/auth-credentials';

export interface UseGoogleUpgradePopupOptions {
  idToken: string;
}

export const useGoogleUpgradePopup = ({
  idToken,
}: UseGoogleUpgradePopupOptions) => {
  const router = useRouter();
  const { closePopup } = usePopup();
  const [error, setError] = useState<string | null>(null);

  const [pending, onConfirm] = usePendingCallback(async () => {
    setError(null);

    const credentials: AuthCredentialsSchema = {
      type: 'googleUpgrade',
      idToken,
    };

    const res = await signIn('credentials', {
      redirect: false,
      ...credentials,
    });

    if (res.error) {
      console.error('signIn error:', res);
      setError(res.code ?? 'Algo salió mal :(');
      return;
    }

    closePopup();
    router.refresh();
  }, [router]);

  return { onConfirm, pending, error };
};
