import { AlertPopup } from '@/common/components/popup/AlertPopup';
import type { PopupComponent } from '@/common/context/PopupProvider';
import { LuFileKey } from 'react-icons/lu';

export const ResetPasswordConfirmationPopup: PopupComponent<
  'resetPasswordConfirmation'
> = ({ onClose }) => (
  <AlertPopup title="Restablecer contraseña" Icon={LuFileKey} onClose={onClose}>
    Hemos enviado un correo con el enlace para restablecer tu contraseña.
    ¡Revisa tu bandeja de entrada!
  </AlertPopup>
);
