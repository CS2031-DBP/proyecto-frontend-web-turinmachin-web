import { SelfUserSchema } from '@/user/schemas/self-user';
import { z } from 'zod/v4';

export const LoginResponseSchema = z.object({
  token: z.string(),
  user: SelfUserSchema,
});

export type LoginResponseSchema = z.infer<typeof LoginResponseSchema>;
