import { useApiClient } from '@/api/hooks/use-api-client';
import { usePendingCallback } from '@/common/hooks/use-pending';
import { ChangeEvent, useState } from 'react';
import { UserSchema } from '../schemas/user';
import { useSessionUser } from './use-session-user';

export interface UseProfilePictureEditorOptions {
  user: UserSchema;
}

export const useProfilePictureEditor = ({
  user,
}: UseProfilePictureEditorOptions) => {
  const { mutate: mutateUser } = useSessionUser();
  const { apiClient } = useApiClient();
  const [pictureUrl, setPictureUrl] = useState<string | null>(
    user.profilePicture?.url ?? null,
  );

  const [pending, handleChange] = usePendingCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const picture = e.currentTarget.files?.[0];
      if (!picture) return;

      const res = await apiClient.updateSelfPicture({ body: { picture } });
      const newUser = res.body;

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
