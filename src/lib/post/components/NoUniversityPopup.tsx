'use client';

import { AlertPopup } from '@/lib/common/components/popup/AlertPopup';
import type { PopupComponent } from '@/lib/common/components/providers/PopupProvider';
import { LuUniversity } from 'react-icons/lu';

export const NoUniversityPopup: PopupComponent<'noUniversity'> = ({
  onClose,
}) => (
  <AlertPopup
    title="Universidad no asignada"
    message="Tu correo necesita estar asociado a una universidad para poder publicar."
    Icon={LuUniversity}
    onClose={onClose}
  />
);
