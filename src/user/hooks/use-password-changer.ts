import { useApiClient } from '@/api/hooks/use-api-client';
import { usePendingCallback } from '@/common/hooks/use-pending';
import { routes } from '@/common/util/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { UpdatePasswordSchema } from '../schemas/update-password';

export interface UsePasswordChangerOptions {
  session: Session;
}

export const FormSchema = UpdatePasswordSchema;
export type FormSchema = z.infer<typeof FormSchema>;

export const usePasswordChanger = ({ session }: UsePasswordChangerOptions) => {
  const router = useRouter();

  const { apiClient } = useApiClient();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newPassword: '',
    },
  });

  const [pending, handleSubmit] = usePendingCallback(
    async (data: FormSchema) => {
      const res = await apiClient.updateSelfPassword({ body: data });
      if (res.status === 401) {
        throw 'Contraseña actual incorrecta.';
      }

      router.push(routes.users.byUsername(session.user.username));
    },
    [router, apiClient],
  );

  return { form, pending, handleSubmit };
};
