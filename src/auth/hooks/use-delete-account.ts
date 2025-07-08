import { useApiClient } from '@/api/hooks/use-api-client';
import { usePendingCallback } from '@/common/hooks/use-pending';
import { routes } from '@/common/util/routes';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export interface UseDeleteSelfAccountOptions {
  onClose: () => void;
}

export const useDeleteSelfAccount = ({
  onClose,
}: UseDeleteSelfAccountOptions) => {
  const { apiClient } = useApiClient();
  const router = useRouter();

  const [pending, deleteSelfAccount] = usePendingCallback(async () => {
    await apiClient.deleteSelf(undefined);
    await signOut({ redirect: false });
    router.push(routes.home);
    onClose();
  }, [apiClient, router]);

  return { pending, deleteSelfAccount };
};
