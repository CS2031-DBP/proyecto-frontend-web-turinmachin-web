import { Popup } from '@/lib/common/components/popup/Popup';
import { LuTriangleAlert } from 'react-icons/lu';

export interface Props {
  onClose: () => void;
}

export const ToxicityPostPopup = ({ onClose }: Props) => (
  <Popup className="bg-surface border-background-alt relative w-full max-w-sm rounded-xl border px-4 py-6">
    <div className="mb-2 flex justify-center text-yellow-300">
      <LuTriangleAlert className="h-10 w-10" />
    </div>

    <h2 className="mb-2 text-center text-xl font-bold">Contenido no seguro</h2>

    <p className="text-center">
      Tu publicación podría contener contenido inapropiado. Por favor, revísala
      antes de publicarla nuevamente.
    </p>
    <button
      onClick={onClose}
      className="bg-special hover:bg-special-muted my-3 w-full rounded py-2 font-bold text-white transition-colors ease-in-out"
    >
      Continuar
    </button>
  </Popup>
);
