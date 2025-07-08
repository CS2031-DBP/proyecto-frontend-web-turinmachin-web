import { serverEnv } from '@/common/env/server';
import { Zodios } from '@zodios/core';
import { Session } from 'next-auth';
import { api } from './api';

export const createServerApiClient = (session: Session | null) =>
  new Zodios(serverEnv.API_URL_INTERNAL, api, {
    axiosConfig: {
      headers: {
        Authorization: session?.accessToken
          ? `Bearer ${session.accessToken}`
          : undefined,
      },
    },
  });
