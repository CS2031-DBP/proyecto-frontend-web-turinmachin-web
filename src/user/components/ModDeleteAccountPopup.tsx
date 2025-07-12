import { Button } from '@/common/components/Button';
import { Popup } from '@/common/components/popup/Popup';
import { PopupComponent } from '@/common/context/PopupProvider';
import { LuTrash } from 'react-icons/lu';
import { useModDeleteAccount } from '../hooks/use-mod-delete-account';

export const ModDeleteAccountPopup: PopupComponent<'modDeleteAccount'> = ({
  onClose,
  user,
}) => {
  const { pending, deleteAccount } = useModDeleteAccount({ onClose, user });

  return (
    <Popup className="max-w-sm">
      <Popup.Title>
        ¿Eliminar cuenta de <strong>@{user.username}</strong>?
      </Popup.Title>
      <p>Esta acción no se puede deshacer.</p>
      <Button
        variant="error"
        onClick={deleteAccount}
        disabled={pending}
        className="mt-6 w-full"
      >
        <LuTrash className="mr-2 mb-1 inline" />
        Eliminar cuenta
      </Button>
    </Popup>
  );
};
