import { createContext } from 'react';
import type { UserSchema } from '../../user/schemas/user';

export const UserContext = createContext<
  [loading: boolean, user: UserSchema | null]
>([true, null]);
