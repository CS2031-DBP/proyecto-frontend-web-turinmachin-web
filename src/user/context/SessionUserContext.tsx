'use client';
import { createContext } from 'react';
import { SWRResponse } from 'swr';
import { SelfUserSchema } from '../schemas/self-user';

export interface SessionUserContextValue
  extends Omit<SWRResponse<SelfUserSchema | null>, 'data'> {
  user: SelfUserSchema | null;
}

export const SessionUserContext = createContext<SessionUserContextValue>({
  user: null,
  error: null,
  isLoading: true,
  isValidating: true,
  mutate: () => {
    throw new Error('mutate() is not implemented');
  },
});
