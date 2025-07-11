import { useApiClient } from '@/api/hooks/use-api-client';
import { usePendingCallback } from '@/common/hooks/use-pending';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const useDeleteSelfAccount = () => {
  const { apiClient } = useApiClient();
  const router = useRouter();

  const [pending, deleteSelfAccount] = usePendingCallback(async () => {
    await apiClient.deleteSelf();
    await signOut({ redirect: false });
    window.location.reload();
  }, [apiClient, router]);

  return { pending, deleteSelfAccount };
};
