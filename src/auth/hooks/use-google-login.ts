import { usePendingCallback } from '@/common/hooks/use-pending';
import { usePopup } from '@/common/hooks/use-popup';
import { CredentialResponse } from '@react-oauth/google';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AuthCredentialsSchema } from '../schemas/auth-credentials';

export const useGoogleLogin = () => {
  const { closePopup, openPopup } = usePopup();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const registerInstead = async (idToken: string) => {
    const credentials: AuthCredentialsSchema = {
      type: 'googleRegister',
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

    router.refresh();

    const session = await getSession();
    if (session) {
      openPopup('googleWelcome', { username: session.user.username });
    }
  };

  const [pending, handleSuccess] = usePendingCallback(
    async (response: CredentialResponse) => {
      const idToken = response.credential;
      if (!idToken) return;

      setError(null);

      const credentials: AuthCredentialsSchema = {
        type: 'googleLogin',
        idToken,
      };
      const res = await signIn('credentials', {
        redirect: false,
        ...credentials,
      });

      if (res.error) {
        // TODO: needs way better error handling
        if (res.code?.includes('asociado')) {
          openPopup('googleUpgrade', { idToken });
        } else if (res.code?.includes('existe')) {
          registerInstead(idToken);
        } else {
          console.error('signIn error:', res);
          setError(res.code ?? 'Algo salió mal :(');
        }
        return;
      }

      router.refresh();
      closePopup();
    },
    [router, closePopup],
  );

  return { handleSuccess, pending, error };
};
