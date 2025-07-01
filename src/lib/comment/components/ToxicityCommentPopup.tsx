import { LuMailWarning, LuTriangleAlert } from 'react-icons/lu';

export interface Props {
  onClose: () => void;
}

export const VerificationPopup = ({ onClose }: Props) => (
  <div className="bg-surface border-background-alt relative w-full max-w-sm rounded-xl border px-6 py-8">
    <div className="mb-2 flex justify-center text-yellow-300">
      <LuTriangleAlert className="h-10 w-10" />
    </div>

    <h2 className="mb-2 text-center text-xl font-bold">Contenido no seguro</h2>
    <div>
      <LuMailWarning size={40} />
    </div>
    <p>
      Hemos detectado que tu comentario podría contener contenido no seguro. Por
      favor, revisa y ajusta el mensaje antes de intentarlo nuevamente. ¡Gracias
      por ayudarnos a mantener un espacio seguro para todos!
    </p>
    <button
      onClick={onClose}
      className="bg-special hover:bg-special-muted mb-3 w-full rounded py-2 font-bold text-white transition-colors ease-in-out"
    >
      Continuar
    </button>
  </div>
);
