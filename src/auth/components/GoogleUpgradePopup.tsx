'use client';
import { Button } from '@/common/components/Button';
import { Popup } from '@/common/components/popup/Popup';
import { PopupComponent } from '@/common/components/providers/PopupProvider';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleUpgradePopup } from '../hooks/use-google-upgrade-popup';

export const GoogleUpgradePopup: PopupComponent<'googleUpgrade'> = ({
  idToken,
  onClose,
}) => {
  const { onConfirm, pending, error } = useGoogleUpgradePopup({ idToken });

  return (
    <Popup className="max-w-sm">
      <Popup.Title className="text-center">Asociar cuenta a Google</Popup.Title>

      <div className="text-special mt-6 mb-2 flex justify-center">
        <FcGoogle className="h-10 w-10" />
      </div>

      <div className="space-y-4">
        <p className="text-center font-semibold">
          ¿Quieres asociar tu usuario de UniLife a esta cuenta de Google
        </p>
        <p className="text-foreground-muted text-center">
          ¡Esto reemplazaría el inicio de sesión por contraseña!
        </p>
      </div>

      <div className="mt-8 space-y-3">
        <Button
          variant="special"
          onClick={onConfirm}
          disabled={pending}
          className="w-full"
        >
          Asociar con Google
        </Button>
        <Button
          variant="outline"
          onClick={onClose}
          disabled={pending}
          className="w-full"
        >
          Cancelar
        </Button>
      </div>
      {error && <p className="text-error mt-6 text-center">{error}</p>}
    </Popup>
  );
};
