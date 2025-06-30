'use client';

import { useRoleSelector } from '../hooks/use-role-selector';
import { UserSchema } from '../schemas/user';

export interface Props {
  user: UserSchema;
}

export const RoleSelector = ({ user }: Props) => {
  const { role, pending, handleChange } = useRoleSelector({ user });

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
