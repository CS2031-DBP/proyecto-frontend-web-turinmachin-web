'use client';

import { useApiClient } from '@/api/hooks/use-api-client';
import { usePendingCallback } from '@/common/hooks/use-pending';
import { usePopup } from '@/common/hooks/use-popup';
import { zodResolver } from '@hookform/resolvers/zod';
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
        const res = await apiClient.requestPasswordReset({ body: { email } });

        if (res.status === 404) {
          throw 'No se encontró una cuenta con ese correo.';
        }

        if (res.status === 409) {
          throw 'Ya se ha enviado una solicitud de restablecimiento recientemente.';
        }

        onClose();
        openPopup('resetPasswordConfirmation', {});
      } catch (err) {
        console.error(err);
        throw 'Ocurrió un error al intentar enviar el correo. Intenta nuevamente.';
      }
    },
    [apiClient, onClose],
  );

  return { form, pending, handleSubmit };
};
