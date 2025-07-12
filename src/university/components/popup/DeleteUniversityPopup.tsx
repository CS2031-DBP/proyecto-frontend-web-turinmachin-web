import { Button } from '@/common/components/Button';
import { Popup } from '@/common/components/popup/Popup';
import { PopupComponent } from '@/common/context/PopupProvider';
import { LuTrash } from 'react-icons/lu';
import { useDeleteUniversity } from '../../hooks/use-delete-university';

export const DeleteUniversityPopup: PopupComponent<'deleteUniversity'> = ({
  universityId,
  onClose,
}) => {
  const { pending, deleteUniversity } = useDeleteUniversity({
    universityId,
    onClose,
  });

  return (
    <Popup className="max-w-sm">
      <Popup.Title>¿Eliminar esta universidad?</Popup.Title>
      <p>Esta acción no se puede deshacer.</p>
      <Button
        variant="error"
        onClick={deleteUniversity}
        disabled={pending}
        className="mt-6 w-full"
      >
        <LuTrash className="mr-2 mb-1 inline" />
        Eliminar universidad
      </Button>
    </Popup>
  );
};
