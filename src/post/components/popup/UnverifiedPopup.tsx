import { AlertPopup } from '@/common/components/popup/AlertPopup';
import type { PopupComponent } from '@/common/context/PopupProvider';
import { LuShieldCheck } from 'react-icons/lu';

export const UnverifiedPopup: PopupComponent<'unverified'> = ({ onClose }) => (
  <AlertPopup title="Verifica tu cuenta" Icon={LuShieldCheck} onClose={onClose}>
    ¡Necesitas verificar tu correo antes de poder publicar!
  </AlertPopup>
);
