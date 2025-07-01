'use client';

import { AlertPopup } from '@/lib/common/components/popup/AlertPopup';
import type { PopupComponent } from '@/lib/common/components/providers/PopupProvider';
import { LuMessageCircleWarning } from 'react-icons/lu';

export const ToxicityCommentPopup: PopupComponent<'toxicityComment'> = ({
  onClose,
}) => (
  <AlertPopup
    title="Contenido no seguro"
    message="Tu comentario podría contener contenido inapropiado. Por favor, revísalo antes de comentar nuevamente."
    Icon={LuMessageCircleWarning}
    onClose={onClose}
  />
);
