import { Button } from '@/lib/common/components/Button';
import { Popup } from '@/lib/common/components/popup/Popup';
import { PopupComponent } from '@/lib/common/components/providers/PopupProvider';
import { LuMessageCircleWarning } from 'react-icons/lu';

export interface Props {
  onClose: () => void;
}

export const ToxicityCommentPopup: PopupComponent<'toxicityComment'> = ({
  onClose,
}: Props) => (
  <Popup className="bg-surface border-background-alt relative w-full max-w-sm rounded-xl border px-4 py-6">
    <div className="text-warn mb-2 flex justify-center">
      <LuMessageCircleWarning className="h-10 w-10" />
    </div>

    <h2 className="mb-2 text-center text-xl font-bold">Contenido no seguro</h2>

    <p className="text-center">
      Tu comentario podría contener contenido inapropiado. Por favor, revísala
      antes de comentar nuevamente.
    </p>
    <Button
      onClick={onClose}
      variant="special"
      className="my-3 w-full rounded font-bold text-white transition-colors ease-in-out"
    >
      Continuar
    </Button>
  </Popup>
);
