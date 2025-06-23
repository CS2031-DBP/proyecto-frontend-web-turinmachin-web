import { LuMail, LuMailWarning } from 'react-icons/lu';

export interface Props {
  onClose: () => void;
}

export const VerificationPopup = ({ onClose }: Props) => (
  <div className="bg-surface border-background-alt relative w-full max-w-sm rounded-xl border px-6 py-8">
    <div className="text-special mb-2 flex justify-center">
      <LuMail className="h-10 w-10" />
    </div>

    <h2 className="mb-2 text-center text-xl font-bold">
      Correo de verificación
    </h2>
    <div>
      <LuMailWarning size={40} />
    </div>
    <p>Te hemos enviado un correo de verificación.</p>
    <p>¡Hasta que te verifiques, no podrás interactuar todavía!</p>
    <button
      onClick={onClose}
      className="mb-3 w-full rounded bg-green-600 py-2 font-bold text-white transition-colors ease-in-out hover:bg-green-700"
    >
      Continuar
    </button>
  </div>
);
