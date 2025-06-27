'use client';

import { Button } from '@/lib/common/components/Button';
import { Form } from '@/lib/common/components/form/Form';
import { FormInput } from '@/lib/common/components/form/FormInput';
import { Popup } from '@/lib/common/components/popup/Popup';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { usePopup } from '@/lib/common/hooks/use-popup';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LoginRequestSchema } from '../schemas/login-request';

export const FormSchema = LoginRequestSchema;
export type FormSchema = z.infer<typeof FormSchema>;

export const LoginPopup = () => {
  const router = useRouter();
  const { openPopup, closePopup } = usePopup();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const [pending, handleSubmit] = usePendingCallback(
    async (data: FormSchema) => {
      const res = await signIn('credentials', { redirect: false, ...data });

      if (res.error) {
        throw res.code ?? 'Algo salió mal :(';
      }

      closePopup();
      router.refresh();
    },
    [],
  );

  return (
    <Popup className="max-w-sm">
      <Popup.Title>Iniciar sesión</Popup.Title>

      <Form form={form} onSubmit={handleSubmit}>
        <FormInput form={form} label="Usuario / correo" name="username" />
        <FormInput
          form={form}
          label="Contraseña"
          name="password"
          type="password"
        />
        <Button
          type="submit"
          variant="special"
          disabled={pending}
          className="w-full"
        >
          Ingresar
        </Button>
      </Form>

      <Popup.Footer>
        ¿No tienes una cuenta?{' '}
        <button
          onClick={() => openPopup('register')}
          className="text-special font-semibold hover:underline"
        >
          ¡Regístrate!
        </button>
      </Popup.Footer>
    </Popup>
  );
};
