'use client';

import { AlertPopup } from '@/lib/common/components/popup/AlertPopup';
import type { PopupComponent } from '@/lib/common/components/providers/PopupProvider';
import { LuFileKey } from 'react-icons/lu';

export const ResetPasswordConfirmationPopup: PopupComponent<
  'resetPasswordConfirmation'
> = ({ onClose }) => (
  <AlertPopup
    title="Restablecer contraseña"
    message="Hemos enviado un correo con el enlace para restablecer tu contraseña. ¡Revisa tu bandeja de entrada!"
    Icon={LuFileKey}
    onClose={onClose}
  />
);
