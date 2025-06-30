import { Button } from '@/lib/common/components/Button';
import { Form } from '@/lib/common/components/form/Form';
import { FormInput } from '@/lib/common/components/form/FormInput';
import { Popup } from '@/lib/common/components/popup/Popup';
import { PopupComponent } from '@/lib/common/components/providers/PopupProvider';
import { usePopup } from '@/lib/common/hooks/use-popup';
import { useLoginForm } from '../hooks/use-login-form';

export const LoginPopup: PopupComponent = ({ onClose }) => {
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
