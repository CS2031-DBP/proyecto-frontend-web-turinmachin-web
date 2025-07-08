'use client';

import { Button } from '@/common/components/Button';
import { Form } from '@/common/components/form/Form';
import { FormInput } from '@/common/components/form/FormInput';
import { Spinner } from '@/common/components/Spinner';
import { useResetPasswordScreen } from '../hooks/use-reset-password-screen';

export const ResetPasswordScreen = () => {
  const { status, form, onSubmit, pending } = useResetPasswordScreen();

  if (status === 'invalid') {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Enlace expirado o inválido</h2>
        <p className="text-foreground-muted my-2">
          Solicita un nuevo restablecimiento de contraseña desde el login.
        </p>
      </div>
    );
  }

  if (status === 'verifying') {
    return (
      <>
        <p className="text-foreground-muted text-center">
          Verificando enlace...
        </p>
        <div className="my-8 flex items-center justify-center">
          <Spinner />
        </div>
      </>
    );
  }

  return (
    <div className="w-full max-w-sm space-y-4">
      <h2 className="text-center text-2xl font-semibold">Nueva contraseña</h2>
      <Form form={form} onSubmit={onSubmit}>
        <FormInput
          form={form}
          name="newPassword"
          type="password"
          label="Contraseña nueva"
        />
        <Button type="submit" className="w-full" disabled={pending}>
          Cambiar contraseña
        </Button>
      </Form>
    </div>
  );
};
