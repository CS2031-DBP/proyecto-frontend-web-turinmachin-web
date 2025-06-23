import { z } from 'zod';

export const LoginRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginRequestSchema = z.infer<typeof LoginRequestSchema>;
