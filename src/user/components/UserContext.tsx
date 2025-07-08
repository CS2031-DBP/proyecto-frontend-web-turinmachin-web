'use client';

import { createContext } from 'react';
import { SWRResponse } from 'swr';
import { UserSchema } from '../schemas/user';

export interface UserContextValue
  extends Omit<SWRResponse<UserSchema | null>, 'data'> {
  user: UserSchema | null;
}

export const UserContext = createContext<UserContextValue>({
  user: null,
  error: null,
  isLoading: true,
  isValidating: true,
  mutate: () => {
    throw new Error('mutate() is not implemented');
  },
});
