import type { User } from '../../user/types/user';

export interface AuthContextValue {
  user: User | null;
  token: string | null;
}
