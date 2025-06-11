import { createContext } from 'react';
import type { AuthContextValue } from '../types/auth-context-value';

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  token: null,
});
