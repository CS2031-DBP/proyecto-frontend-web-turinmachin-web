import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { Button } from '@/lib/common/components/Button';
import { Popup } from '@/lib/common/components/popup/Popup';
import { PopupComponent } from '@/lib/common/components/providers/PopupProvider';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { routes } from '@/lib/routes';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LuTrash } from 'react-icons/lu';

export const DeleteAccountPopup: PopupComponent = ({ onClose }) => {
  const { apiClient } = useApiClient();
  const router = useRouter();

  const [pending, handleClick] = usePendingCallback(async () => {
    await apiClient.deleteSelf(undefined);
    await signOut({ redirect: false });
    router.push(routes.home);
    onClose();
  }, [apiClient, router]);

  return (
    <Popup className="max-w-sm">
      <Popup.Title>¿Seguro que quieres borrar tu cuenta?</Popup.Title>
      <p>¡Esta acción es irreversible!</p>
      <Button
        variant="error"
        onClick={handleClick}
        disabled={pending}
        className="mt-6 w-full"
      >
        <LuTrash className="mr-2 mb-1 inline" />
        Eliminar mi cuenta
      </Button>
    </Popup>
  );
};
