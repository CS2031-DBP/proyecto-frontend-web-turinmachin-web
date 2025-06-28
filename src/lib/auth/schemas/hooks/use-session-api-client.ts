import { createServerApiClient } from '@/lib/api/util/client';
import { Session } from 'next-auth';
import { useMemo } from 'react';

export const useSessionApiClient = (session: Session | null) =>
  useMemo(() => createServerApiClient(session), [session]);
