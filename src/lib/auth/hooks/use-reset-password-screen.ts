'use client';

import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { routes } from '@/lib/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const ResetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(4, 'Tu contraseña debe tener al menos 4 caracteres.'),
});

export type ResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;

export type ResetStatus = 'verifying' | 'valid' | 'invalid';

export const useResetPasswordScreen = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const { apiClient } = useApiClient();
  const router = useRouter();

  const [status, setStatus] = useState<ResetStatus>('verifying');
  const [pending, setPending] = useState(false);
  const verified = useRef(false);

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      newPassword: '',
    },
  });

  const verifyToken = useCallback(async () => {
    if (!token) {
      setStatus('invalid');
      return;
    }

    try {
      const response = await apiClient.verifyResetToken({ token });
      setStatus(response.valid ? 'valid' : 'invalid');
    } catch (err) {
      console.error(err);
      setStatus('invalid');
    }
  }, [token, apiClient]);

  useEffect(() => {
    if (verified.current) return;
    verified.current = true;
    verifyToken();
  }, [verifyToken]);

  const onSubmit = useCallback(
    async (data: ResetPasswordSchema) => {
      if (!token) return;
      setPending(true);
      try {
        await apiClient.resetPassword({ token, newPassword: data.newPassword });
        router.push(routes.home);
      } catch (err) {
        console.error(err);
      } finally {
        setPending(false);
      }
    },
    [apiClient, token, router],
  );

  return {
    token,
    status,
    form,
    onSubmit,
    pending,
  };
};
