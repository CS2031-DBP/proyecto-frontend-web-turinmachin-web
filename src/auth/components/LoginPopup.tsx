import { TextDivider } from '@/comment/components/TextDivider';
import { Button } from '@/common/components/Button';
import { Form } from '@/common/components/form/Form';
import { FormInput } from '@/common/components/form/FormInput';
import { Popup } from '@/common/components/popup/Popup';
import { PopupComponent } from '@/common/components/providers/PopupProvider';
import { usePopup } from '@/common/hooks/use-popup';
import { useLoginForm } from '../hooks/use-login-form';
import { GoogleAuthButton } from './GoogleAuthButton';

export const LoginPopup: PopupComponent<'login'> = ({ onClose }) => {
  const { openPopup } = usePopup();
  const { form, pending, handleSubmit } = useLoginForm({ onClose });

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
        <div className="mb-4 text-sm">
          <button
            type="button"
            onClick={() => {
              onClose();
              openPopup('resetPassword', {});
            }}
            className="text-foreground-muted font-semibold hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <Button
          type="submit"
          variant="special"
          disabled={pending}
          className="w-full"
        >
          Ingresar
        </Button>
      </Form>
      <TextDivider>o</TextDivider>
      <GoogleAuthButton />

      <Popup.Footer>
        ¿No tienes una cuenta?{' '}
        <button
          onClick={() => openPopup('register', {})}
          className="text-special font-semibold hover:underline"
        >
          ¡Regístrate!
        </button>
      </Popup.Footer>
    </Popup>
  );
};
