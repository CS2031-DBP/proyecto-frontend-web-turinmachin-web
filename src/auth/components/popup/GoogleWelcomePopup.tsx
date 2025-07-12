import { Button } from '@/common/components/Button';
import { Popup } from '@/common/components/popup/Popup';
import { PopupComponent } from '@/common/context/PopupProvider';
import { routes } from '@/common/util/routes';
import { useRouter } from 'next/navigation';
import { LuPartyPopper, LuSettings } from 'react-icons/lu';

export const GoogleWelcomePopup: PopupComponent<'googleWelcome'> = ({
  username,
  onClose,
}) => {
  const router = useRouter();

  const handleProceed = () => {
    router.push(routes.users.editByUsername(username));
    onClose();
  };

  return (
    <Popup className="max-w-md">
      <div className="mb-3 flex justify-center">
        <LuPartyPopper className="text-special size-8" />
      </div>
      <Popup.Title className="text-center">¡Bienvenido a UniLife!</Popup.Title>
      <div className="my-6 space-y-4 text-center">
        <p>Estamos felices de tenerte por aquí :)</p>
        <p>
          <span className="text-foreground-muted">
            ¡Recuerda terminar de personalizar tu cuenta!
          </span>{' '}
        </p>
      </div>
      <div className="mt-8 space-y-3">
        <Button
          onClick={handleProceed}
          className="button-normal inline-block w-full"
        >
          <LuSettings className="mr-1 inline size-4" />
          Editar cuenta
        </Button>
        <Button variant="outline" onClick={onClose} className="w-full">
          Ahora no
        </Button>
      </div>
    </Popup>
  );
};
