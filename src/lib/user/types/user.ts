import { z } from 'zod/v4';

export const User = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  displayName: z.string(),
});

export type User = z.infer<typeof User>;
