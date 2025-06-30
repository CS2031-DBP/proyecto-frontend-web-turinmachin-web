'use client';

import { Button } from '@/lib/common/components/Button';
import { Form } from '@/lib/common/components/form/Form';
import { FormInput } from '@/lib/common/components/form/FormInput';
import { routes } from '@/lib/routes';
import { Session } from 'next-auth';
import Link from 'next/link';
import { usePasswordChanger } from '../hooks/use-password-changer';

export interface Props {
  session: Session;
}

export const PasswordChanger = ({ session }: Props) => {
  const { form, pending, handleSubmit } = usePasswordChanger({ session });

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
