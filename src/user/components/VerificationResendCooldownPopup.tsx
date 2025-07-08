import { Button } from '@/common/components/Button';
import { Popup } from '@/common/components/popup/Popup';
import { LuMailQuestion } from 'react-icons/lu';

export interface Props {
  onClose: () => void;
}

export const VerificationResendCooldownPopup = ({ onClose }: Props) => (
  <Popup className="bg-surface border-background-alt relative w-full max-w-sm rounded-xl border px-4 py-6">
    <div className="text-special mb-2 flex justify-center">
      <LuMailQuestion className="h-10 w-10" />
    </div>

    <h2 className="mb-2 text-center text-xl font-bold">Correo ya enviado</h2>

    <p className="text-center">
      Ya te hemos reenviado el correo de verificación. Revisa tu bandeja de
      entrada o carpeta de spam.
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
