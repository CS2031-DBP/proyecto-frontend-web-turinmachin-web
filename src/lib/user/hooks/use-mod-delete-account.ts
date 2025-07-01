import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { routes } from '@/lib/routes';
import { useRouter } from 'next/navigation';
import { UserSchema } from '../schemas/user';

export interface UseModDeleteAccountOptions {
  user: UserSchema;
  onClose: () => void;
}

export const useModDeleteAccount = ({
  user,
  onClose,
}: UseModDeleteAccountOptions) => {
  const { apiClient } = useApiClient();
  const router = useRouter();

  const [pending, deleteAccount] = usePendingCallback(async () => {
    await apiClient.deleteUser(undefined, { params: { id: user.id } });
    router.push(routes.home);
    onClose();
  }, [apiClient, router]);

  return { pending, deleteAccount };
};
