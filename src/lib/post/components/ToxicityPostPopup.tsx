import { Popup } from '@/lib/common/components/popup/Popup';
import { usePopup } from '@/lib/common/hooks/use-popup';
import { LuTriangleAlert } from 'react-icons/lu';

export interface Props {
  onClose: () => void;
}

export const ToxicityPostPopup = ({ onClose }: Props) => {
  const { openPopup } = usePopup();

  const handleContinue = () => {
    onClose();
    openPopup('post');
  };

  return (
    <Popup className="bg-surface border-background-alt relative w-full max-w-sm rounded-xl border px-4 py-6">
      <div className="text-warn mb-2 flex justify-center">
        <LuTriangleAlert className="h-10 w-10" />
      </div>

      <h2 className="mb-2 text-center text-xl font-bold">
        Contenido no seguro
      </h2>

      <p className="text-center">
        Tu publicación podría contener contenido inapropiado. Por favor,
        revísala antes de publicarla nuevamente.
      </p>
      <button
        onClick={handleContinue}
        className="bg-special hover:bg-special-muted my-3 w-full rounded py-2 font-bold text-white transition-colors ease-in-out"
      >
        Continuar
      </button>
    </Popup>
  );
};
