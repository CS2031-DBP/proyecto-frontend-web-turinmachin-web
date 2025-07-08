import { createServerApiClient } from '@/api/util/create-server-api-client';
import { Session } from 'next-auth';
import { useMemo } from 'react';

export const useSessionApiClient = (session: Session | null) =>
  useMemo(() => createServerApiClient(session), [session]);
