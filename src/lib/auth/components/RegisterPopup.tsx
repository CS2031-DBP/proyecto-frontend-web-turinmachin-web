import { Button } from '@/lib/common/components/Button';
import { Form } from '@/lib/common/components/form/Form';
import { FormInput } from '@/lib/common/components/form/FormInput';
import { Popup } from '@/lib/common/components/popup/Popup';
import { PopupComponent } from '@/lib/common/components/providers/PopupProvider';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { usePopup } from '@/lib/common/hooks/use-popup';
import { removeUndefined } from '@/lib/common/util/object';
import { EmailUniversityInfo } from '@/lib/user/components/EmailUniversityInfo';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { RegisterRequestSchema } from '../schemas/register-request';

const FormSchema = RegisterRequestSchema;
type FormSchema = z.infer<typeof FormSchema>;

export const RegisterPopup: PopupComponent = ({ onClose }) => {
  const router = useRouter();
  const { openPopup } = usePopup();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      username: '',
      displayName: '',
      password: '',
    },
  });

  const [pending, onSubmit] = usePendingCallback(
    async (data: FormSchema) => {
      const res = await signIn('credentials', {
        redirect: false,
        type: 'register',
        ...removeUndefined(data),
      });

      if (res.error) {
        throw res.code ?? 'Algo salió mal :(';
      }

      onClose();
      router.refresh();
    },
    [router],
  );

  const email = form.watch('email');

  return (
    <Popup className="max-w-sm">
      <Popup.Title>Crear cuenta</Popup.Title>

      <Form form={form} onSubmit={onSubmit}>
        <FormInput
          form={form}
          name="email"
          type="email"
          label="Correo institucional"
        >
          <EmailUniversityInfo email={email} />
        </FormInput>
        <FormInput form={form} name="username" label="Nombre de usuario" />
        <FormInput
          form={form}
          name="displayName"
          label="Nombre real"
          required={false}
        />
        <FormInput
          form={form}
          name="password"
          type="password"
          label="Contraseña"
        />
        <Button
          type="submit"
          variant="special"
          disabled={pending}
          className="w-full"
        >
          Crear cuenta
        </Button>
      </Form>

      <Popup.Footer>
        ¿Ya tienes una cuenta?{' '}
        <button
          onClick={() => openPopup('login')}
          className="text-special font-bold hover:underline"
        >
          Iniciar sesión
        </button>
      </Popup.Footer>
    </Popup>
  );
};
