import { clientEnv } from '@/common/env/client';
import { initClient, InitClientArgs, InitClientReturn } from '@ts-rest/core';
import { baseClientArgs } from './common';
import { appContract } from './contract';

export const clientClientArgs: InitClientArgs = {
  ...baseClientArgs,
  baseUrl: clientEnv.NEXT_PUBLIC_API_URL,
} as const;

export type ClientApiClient = InitClientReturn<
  typeof appContract,
  typeof clientClientArgs
>;

export const createClientApiClient = (jwt: string | null): ClientApiClient =>
  initClient(appContract, {
    ...clientClientArgs,
    baseHeaders: jwt ? { Authorization: `Bearer ${jwt}` } : {},
  });
