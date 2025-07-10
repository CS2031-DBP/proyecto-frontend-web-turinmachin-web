import { Button } from '@/common/components/Button';
import { Popup } from '@/common/components/popup/Popup';
import { PopupComponent } from '@/common/components/providers/PopupProvider';
import { LuTrash } from 'react-icons/lu';
import { useDeleteSelfAccount } from '../hooks/use-delete-account';

export const DeleteAccountPopup: PopupComponent<'deleteAccount'> = () => {
  const { pending, deleteSelfAccount } = useDeleteSelfAccount();

  return (
    <Popup className="max-w-sm">
      <Popup.Title>¿Seguro que quieres borrar tu cuenta?</Popup.Title>
      <p>¡Esta acción es irreversible!</p>
      <Button
        variant="error"
        onClick={deleteSelfAccount}
        disabled={pending}
        className="mt-6 w-full"
      >
        <LuTrash className="mr-2 mb-1 inline" />
        Eliminar mi cuenta
      </Button>
    </Popup>
  );
};
