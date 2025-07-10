import { usePendingCallback } from '@/common/hooks/use-pending';
import { usePopup } from '@/common/hooks/use-popup';
import { CredentialResponse } from '@react-oauth/google';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AuthCredentialsSchema } from '../schemas/auth-credentials';

export const useGoogleLogin = () => {
  const { closePopup } = usePopup();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const [pending, handleSuccess] = usePendingCallback(
    async (response: CredentialResponse) => {
      if (!response.credential) return;

      setError(null);

      const credentials: AuthCredentialsSchema = {
        type: 'google',
        idToken: response.credential,
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
    },
    [router, closePopup],
  );

  return { handleSuccess, pending, error };
};
