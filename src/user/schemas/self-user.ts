import { z } from 'zod/v4';
import { UserSchema } from './user';

export const SelfUserSchema = UserSchema.extend({
  authProvider: z.enum(['CREDENTIALS', 'GOOGLE']),
  hasPassword: z.boolean(),
  streakSafe: z.boolean(),
});

export type SelfUserSchema = z.infer<typeof SelfUserSchema>;
