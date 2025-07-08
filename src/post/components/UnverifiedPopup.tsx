'use client';

import { AlertPopup } from '@/common/components/popup/AlertPopup';
import type { PopupComponent } from '@/common/components/providers/PopupProvider';
import { LuShieldCheck } from 'react-icons/lu';

export const UnverifiedPopup: PopupComponent<'unverified'> = ({ onClose }) => (
  <AlertPopup
    title="Verifica tu cuenta"
    message="¡Necesitas verificar tu correo antes de poder publicar!"
    Icon={LuShieldCheck}
    onClose={onClose}
  />
);
