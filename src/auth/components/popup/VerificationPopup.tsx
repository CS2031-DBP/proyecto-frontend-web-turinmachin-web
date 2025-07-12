import { AlertPopup } from '@/common/components/popup/AlertPopup';
import type { PopupComponent } from '@/common/context/PopupProvider';
import { LuMailCheck } from 'react-icons/lu';

export const VerificationPopup: PopupComponent<'verification'> = ({
  onClose,
}) => (
  <AlertPopup
    title="Correo de verificación"
    Icon={LuMailCheck}
    onClose={onClose}
  >
    Te hemos enviado un correo de verificación. ¡Hasta que te verifiques, no
    podrás interactuar todavía!
  </AlertPopup>
);
