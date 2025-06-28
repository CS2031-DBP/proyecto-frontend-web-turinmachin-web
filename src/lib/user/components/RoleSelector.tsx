'use client';

import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { ChangeEvent, useState } from 'react';
import { RoleSchema } from '../schemas/role';
import { UserSchema } from '../schemas/user';

export interface Props {
  user: UserSchema;
}

export const RoleSelector = ({ user }: Props) => {
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

  return (
    <label>
      Rol:{' '}
      <select
        value={role}
        onChange={handleChange}
        disabled={pending}
        className="form-input"
      >
        <option value="USER">Usuario</option>
        <option value="MODERATOR">Moderador</option>
        <option value="ADMIN">Administrador</option>
      </select>
    </label>
  );
};
