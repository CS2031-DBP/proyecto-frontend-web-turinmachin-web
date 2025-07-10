import { TextDivider } from '@/comment/components/TextDivider';
import { Button } from '@/common/components/Button';
import { Form } from '@/common/components/form/Form';
import { FormInput } from '@/common/components/form/FormInput';
import { Popup } from '@/common/components/popup/Popup';
import { PopupComponent } from '@/common/components/providers/PopupProvider';
import { usePopup } from '@/common/hooks/use-popup';
import { EmailUniversityInfo } from '@/user/components/EmailUniversityInfo';
import { useRegisterForm } from '../hooks/use-register-form';
import { GoogleAuthButton } from './GoogleAuthButton';

export const RegisterPopup: PopupComponent<'register'> = ({ onClose }) => {
  const { openPopup } = usePopup();
  const { form, pending, handleSubmit } = useRegisterForm({ onClose });
  const email = form.watch('email');

  return (
    <Popup className="max-w-sm">
      <Popup.Title>Crear cuenta</Popup.Title>

      <Form form={form} onSubmit={handleSubmit}>
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
      <TextDivider>o</TextDivider>
      <GoogleAuthButton />

      <Popup.Footer>
        ¿Ya tienes una cuenta?{' '}
        <button
          onClick={() => openPopup('login', {})}
          className="text-special font-bold hover:underline"
        >
          Iniciar sesión
        </button>
      </Popup.Footer>
    </Popup>
  );
};
