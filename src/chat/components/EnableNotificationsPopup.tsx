import { Button } from '@/common/components/Button';
import { Popup } from '@/common/components/popup/Popup';
import { PopupComponent } from '@/common/context/PopupProvider';
import { LuBell } from 'react-icons/lu';

export const EnableNotificationsPopup: PopupComponent<
  'enableNotifications'
> = ({ onClose, onGrant }) => {
  const askPermission = async () => {
    const permission = await Notification.requestPermission();
    onClose();

    if (permission === 'granted') {
      onGrant();
    }
  };

  const onNotNow = () => {
    localStorage.setItem('notificationsPromptDisabled', 'true');
    onClose();
  };

  return (
    <Popup className="max-w-sm">
      <div className="mb-3 flex justify-center">
        <LuBell className="text-foreground-muted size-8" />
      </div>

      <Popup.Title className="text-center">Activar notificaciones</Popup.Title>

      <p className="my-6 text-center">
        ¡Activa las notificaciones en tu navegador para enterarte de tus chats!
      </p>

      <div className="mt-8 space-y-3">
        <Button variant="special" onClick={askPermission} className="w-full">
          <LuBell className="fill-foreground mr-1 inline size-4" /> Permitir
          notificaciones
        </Button>
        <Button variant="outline" onClick={onNotNow} className="w-full">
          Ahora no
        </Button>
      </div>
    </Popup>
  );
};
