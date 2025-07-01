'use client';

import { AlertPopup } from '@/lib/common/components/popup/AlertPopup';
import type { PopupComponent } from '@/lib/common/components/providers/PopupProvider';
import { LuShieldCheck } from 'react-icons/lu';

export const UnverifiedPopup: PopupComponent<'unverified'> = ({ onClose }) => (
  <AlertPopup
    title="Verifica tu cuenta"
    message="¡Necesitas verificar tu correo antes de poder publicar!"
    Icon={LuShieldCheck}
    onClose={onClose}
  />
);
