'use client';

import { AlertPopup } from '@/common/components/popup/AlertPopup';
import type { PopupComponent } from '@/common/components/providers/PopupProvider';
import { usePopup } from '@/common/hooks/use-popup';
import { LuTriangleAlert } from 'react-icons/lu';

export const ToxicityPostPopup: PopupComponent<'toxicityPost'> = ({
  onClose,
}) => {
  const { openPopup } = usePopup();

  const handleContinue = () => {
    onClose();
    openPopup('post', {});
  };

  return (
    <AlertPopup
      title="Contenido no seguro"
      message="Tu publicación podría contener contenido inapropiado. Por favor, revísala antes de publicarla nuevamente."
      Icon={LuTriangleAlert}
      onClose={handleContinue}
    />
  );
};
