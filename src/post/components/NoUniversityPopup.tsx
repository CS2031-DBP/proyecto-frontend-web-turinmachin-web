import { AlertPopup } from '@/common/components/popup/AlertPopup';
import type { PopupComponent } from '@/common/context/PopupProvider';
import { LuUniversity } from 'react-icons/lu';

export const NoUniversityPopup: PopupComponent<'noUniversity'> = ({
  onClose,
}) => (
  <AlertPopup
    title="Universidad no asignada"
    Icon={LuUniversity}
    onClose={onClose}
  >
    Tu correo necesita estar asociado a una universidad para poder publicar.
  </AlertPopup>
);
