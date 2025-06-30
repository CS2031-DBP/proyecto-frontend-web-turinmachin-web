import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { ChangeEvent, useState } from 'react';
import { useUser } from '../hooks/use-user';
import { UserSchema } from '../schemas/user';

export interface UseProfilePictureEditorOptions {
  user: UserSchema;
}

export const useProfilePictureEditor = ({
  user,
}: UseProfilePictureEditorOptions) => {
  const { mutate: mutateUser } = useUser();
  const { apiClient } = useApiClient();
  const [pictureUrl, setPictureUrl] = useState<string | null>(
    user.profilePicture?.url ?? null,
  );

  const [pending, handleChange] = usePendingCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const picture = e.currentTarget.files?.[0];
      if (!picture) return;

      const newUser = await apiClient.updateSelfPicture({ picture });
      await mutateUser(newUser);
      setPictureUrl(newUser.profilePicture!.url);
    },
    [],
  );

  const [deletePending, deletePicture] = usePendingCallback(async () => {
    await apiClient.deleteSelfPicture(undefined);
    await mutateUser((prevUser) =>
      prevUser ? { ...prevUser, profilePicture: undefined } : null,
    );
    setPictureUrl(null);
  }, []);

  return {
    pending: pending || deletePending,
    handleChange,
    deletePicture,
    pictureUrl,
  };
};
