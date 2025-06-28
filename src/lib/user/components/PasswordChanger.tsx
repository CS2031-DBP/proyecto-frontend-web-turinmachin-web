'use client';

import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { Button } from '@/lib/common/components/Button';
import { Form } from '@/lib/common/components/form/Form';
import { FormInput } from '@/lib/common/components/form/FormInput';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { routes } from '@/lib/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { isErrorFromAlias } from '@zodios/core';
import { Session } from 'next-auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { UpdatePasswordSchema } from '../schemas/update-password';

export interface Props {
  session: Session;
}

export const FormSchema = UpdatePasswordSchema;
export type FormSchema = z.infer<typeof FormSchema>;

export const PasswordChanger = ({ session }: Props) => {
  const router = useRouter();
  const { apiClient } = useApiClient();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  const [pending, handleSubmit] = usePendingCallback(
    async (data: FormSchema) => {
      try {
        await apiClient.updateSelfPassword(data);
      } catch (err) {
        if (!isErrorFromAlias(apiClient.api, 'updateSelfPassword', err)) {
          throw err;
        }

        if (err.response.status === 401) {
          throw 'Contraseña actual incorrecta.';
        }
      }
      router.push(routes.users.byUsername(session.user.username));
    },
    [router, apiClient],
  );

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <FormInput
        form={form}
        name="currentPassword"
        type="password"
        label="Contraseña actual"
      />
      <FormInput
        form={form}
        name="newPassword"
        type="password"
        label="Contraseña nueva"
      />
      <div className="flex justify-end gap-x-4">
        <Link
          href={routes.users.editByUsername(session.user.username)}
          className="button-outline"
        >
          Volver
        </Link>
        <Button type="submit" disabled={pending}>
          Cambiar
        </Button>
      </div>
    </Form>
  );
};
