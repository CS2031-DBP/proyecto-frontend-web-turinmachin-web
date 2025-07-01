import { Button } from '@/lib/common/components/Button';
import { Popup } from '@/lib/common/components/popup/Popup';
import { PopupComponent } from '@/lib/common/components/providers/PopupProvider';
import { LuShieldCheck } from 'react-icons/lu';

export interface Props {
  onClose: () => void;
}

export const UnverifiedPopup: PopupComponent<'unverified'> = ({
  onClose,
}: Props) => (
  <Popup className="bg-surface border-background-alt relative w-full max-w-sm rounded-xl border px-4 py-6">
    <div className="text-special mb-2 flex justify-center">
      <LuShieldCheck className="h-10 w-10" />
    </div>

    <h2 className="mb-2 text-center text-xl font-bold">Verifica tu cuenta</h2>

    <p className="text-center">
      ¡Necesitas verificar tu correo antes de poder publicar!
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
