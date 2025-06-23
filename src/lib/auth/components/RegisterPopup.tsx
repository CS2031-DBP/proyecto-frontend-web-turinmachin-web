import { Button } from '@/lib/common/components/Button';
import { FormInput } from '@/lib/common/components/form/FormInput';
import { Popup } from '@/lib/common/components/popup/Popup';
import { usePopup } from '@/lib/common/hooks/use-popup';
import { EmailUniversityInfo } from '@/lib/user/components/EmailUniversityInfo';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { RegisterRequestSchema } from '../schemas/register-request';

const FormSchema = RegisterRequestSchema;
type FormSchema = z.infer<typeof FormSchema>;

export const RegisterPopup = () => {
  const router = useRouter();
  const { closePopup, openPopup } = usePopup();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormSchema) => {
    const res = await signIn('credentials', {
      redirect: false,
      type: 'register',
      ...data,
    });

    if (res.error) throw 'Credenciales inválidas.';

    closePopup();
    router.refresh();
  };

  const email = form.watch('email');

  return (
    <Popup className="max-w-sm">
      <Popup.Title>Crear cuenta</Popup.Title>

      <form onSubmit={form.handleSubmit(onSubmit)}>
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
        <Button variant="special" className="w-full">
          Crear cuenta
        </Button>
      </form>

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
