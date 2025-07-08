'use client';

import { useApiClient } from '@/api/hooks/use-api-client';
import { usePendingCallback } from '@/common/hooks/use-pending';
import { usePopup } from '@/common/hooks/use-popup';
import { zodResolver } from '@hookform/resolvers/zod';
import { isErrorFromAlias } from '@zodios/core';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  email: z.string().email({ message: 'Correo inválido' }),
});

export type FormSchema = z.infer<typeof FormSchema>;

export const useResetPasswordForm = (onClose: () => void) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });

  const { apiClient } = useApiClient();
  const { openPopup } = usePopup();

  const [pending, handleSubmit] = usePendingCallback(
    async ({ email }) => {
      try {
        await apiClient.requestPasswordReset({ email });
        onClose();
        openPopup('resetPasswordConfirmation', {});
      } catch (err) {
        if (isErrorFromAlias(apiClient.api, 'requestPasswordReset', err)) {
          const status = err.response?.status;

          if (status === 404) {
            throw 'No se encontró una cuenta con ese correo.';
          }

          if (status === 409) {
            throw 'Ya se ha enviado una solicitud de restablecimiento recientemente.';
          }
        }

        throw 'Ocurrió un error al intentar enviar el correo. Intenta nuevamente.';
      }
    },
    [apiClient, onClose],
  );

  return { form, pending, handleSubmit };
};
