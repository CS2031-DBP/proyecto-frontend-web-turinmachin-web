import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod/v4';

export const serverEnv = createEnv({
  server: {
    API_URL_INTERNAL: z.string().url(),
    AUTH_SECRET: z.string().min(1),
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
});
