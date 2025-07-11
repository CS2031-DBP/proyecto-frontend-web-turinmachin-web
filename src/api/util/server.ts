import { serverEnv } from '@/common/env/server';
import { initClient, InitClientArgs, InitClientReturn } from '@ts-rest/core';
import { Session } from 'next-auth';
import { baseClientArgs } from './common';
import { appContract } from './contract';

export const serverClientArgs: InitClientArgs = {
  ...baseClientArgs,
  baseUrl: serverEnv.API_URL_INTERNAL,
} as const;

export type ServerApiClient = InitClientReturn<
  typeof appContract,
  typeof serverClientArgs
>;

export const createServerApiClient = (
  session: Session | null,
): ServerApiClient =>
  initClient(appContract, {
    ...serverClientArgs,
    baseHeaders: session
      ? { Authorization: `Bearer ${session.accessToken}` }
      : {},
  });
