// components/popups/ResetPasswordPopup.tsx
'use client';

import { Button } from '@/common/components/Button';
import { Form } from '@/common/components/form/Form';
import { FormInput } from '@/common/components/form/FormInput';
import { Popup } from '@/common/components/popup/Popup';
import { PopupComponent } from '@/common/components/providers/PopupProvider';
import { usePopup } from '@/common/hooks/use-popup';
import { useResetPasswordForm } from '../hooks/use-reset-password-form';

export const ResetPasswordPopup: PopupComponent<'resetPassword'> = ({
  onClose,
}) => {
  const { openPopup } = usePopup();
  const { form, pending, handleSubmit } = useResetPasswordForm(onClose);

  return (
    <Popup className="max-w-sm">
      <Popup.Title>Recuperar contraseña</Popup.Title>

      <Form form={form} onSubmit={handleSubmit}>
        <FormInput
          form={form}
          name="email"
          label="Correo electrónico"
          type="email"
        />

        <Button
          type="submit"
          className="w-full"
          variant="special"
          disabled={pending}
        >
          Enviar
        </Button>
      </Form>

      <Popup.Footer>
        ¿Recordaste tu contraseña?{' '}
        <button
          onClick={() => {
            onClose();
            openPopup('login', {});
          }}
          className="text-special font-semibold hover:underline"
        >
          Iniciar sesión
        </button>
      </Popup.Footer>
    </Popup>
  );
};
