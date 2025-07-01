import { LuMail, LuMailWarning, LuTriangleAlert } from 'react-icons/lu';

export interface Props {
  onClose: () => void;
}

export const VerificationPopup = ({ onClose }: Props) => (
  <div className="bg-surface border-background-alt relative w-full max-w-sm rounded-xl border px-6 py-8">
    <div className="text-yellow-300 mb-2 flex justify-center">
      <LuTriangleAlert className="h-10 w-10" />
    </div>

    <h2 className="mb-2 text-center text-xl font-bold">
      Contenido no seguro
    </h2>
    <div>
      <LuMailWarning size={40} />
    </div>
    <p>Hemos detectado que tu publicación podría contener contenido no seguro. Por favor, revisa y ajusta el mensaje antes de intentarlo nuevamente. ¡Gracias por ayudarnos a mantener un espacio seguro para todos!</p>
    <button
      onClick={onClose}
      className="mb-3 w-full rounded bg-special py-2 font-bold text-white transition-colors ease-in-out hover:bg-special-muted"
    >
      Continuar
    </button>
  </div>
);
