import { Button } from '@/lib/common/components/Button';
import { Form } from '@/lib/common/components/form/Form';
import { FormInput } from '@/lib/common/components/form/FormInput';
import { Popup } from '@/lib/common/components/popup/Popup';
import { PopupComponent } from '@/lib/common/components/providers/PopupProvider';
import { usePopup } from '@/lib/common/hooks/use-popup';
import { EmailUniversityInfo } from '@/lib/user/components/EmailUniversityInfo';
import { useRegisterForm } from '../hooks/use-register-form';

export const RegisterPopup: PopupComponent = ({ onClose }) => {
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
