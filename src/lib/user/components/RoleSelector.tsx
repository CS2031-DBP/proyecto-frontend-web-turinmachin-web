'use client';

import { useSessionApiClient } from '@/lib/auth/schemas/hooks/use-session-api-client';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { Session } from 'next-auth';
import { ChangeEvent, useState } from 'react';
import { RoleSchema } from '../schemas/role';
import { UserSchema } from '../schemas/user';

export interface Props {
  user: UserSchema;
  session: Session;
}

export const RoleSelector = ({ user, session }: Props) => {
  const [role, setRole] = useState(user.role);

  const apiClient = useSessionApiClient(session);

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
