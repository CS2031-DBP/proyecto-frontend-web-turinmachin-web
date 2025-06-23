import { UserSchema } from '@/lib/user/schemas/user';
import { z } from 'zod';

export const LoginResponseSchema = z.object({
  token: z.string(),
  user: UserSchema,
});

export type LoginResponseSchema = z.infer<typeof LoginResponseSchema>;
