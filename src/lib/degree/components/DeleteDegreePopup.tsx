import { Button } from '@/lib/common/components/Button';
import { Popup } from '@/lib/common/components/popup/Popup';
import { PopupComponent } from '@/lib/common/components/providers/PopupProvider';
import { LuTrash } from 'react-icons/lu';
import { useDeleteDegree } from '../hooks/use-delete-degree';

export const DeleteDegreePopup: PopupComponent<'deleteDegree'> = ({
  degreeId,
  onClose,
}) => {
  const { pending, deleteDegree } = useDeleteDegree({
    degreeId,
    onClose,
  });

  return (
    <Popup className="max-w-sm">
      <Popup.Title>¿Eliminar esta carrera?</Popup.Title>
      <p>Esta acción no se puede deshacer.</p>
      <Button
        variant="error"
        onClick={deleteDegree}
        disabled={pending}
        className="mt-6 w-full"
      >
        <LuTrash className="mr-2 mb-1 inline" />
        Eliminar carrera
      </Button>
    </Popup>
  );
};
