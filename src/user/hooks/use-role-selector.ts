import { useApiClient } from '@/api/hooks/use-api-client';
import { usePendingCallback } from '@/common/hooks/use-pending';
import { ChangeEvent, useState } from 'react';
import { RoleSchema } from '../schemas/role';
import { UserSchema } from '../schemas/user';

export interface UseRoleSelectorOptions {
  user: UserSchema;
}

export const useRoleSelector = ({ user }: UseRoleSelectorOptions) => {
  const [role, setRole] = useState(user.role);

  const { apiClient } = useApiClient();

  const [pending, handleChange] = usePendingCallback(
    async (e: ChangeEvent<HTMLSelectElement>) => {
      const roleValue = RoleSchema.parse(e.target.value);
      await apiClient.updateUserRole(
        { role: roleValue },
        { params: { id: user.id } },
      );
      setRole(roleValue);
    },
    [setRole, apiClient],
  );

  return { role, pending, handleChange };
};
