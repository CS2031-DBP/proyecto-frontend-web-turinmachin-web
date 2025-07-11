import { z } from 'zod';
import { UserSchema } from './user';

export const SelfUserSchema = UserSchema.extend({
  authProvider: z.enum(['CREDENTIALS', 'GOOGLE']),
  hasPassword: z.boolean(),
});

export type SelfUserSchema = z.infer<typeof SelfUserSchema>;
