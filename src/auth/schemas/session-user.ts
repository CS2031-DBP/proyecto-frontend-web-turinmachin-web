import { UserSchema } from '@/user/schemas/user';
import { z } from 'zod';

export const SessionUserSchema = UserSchema.pick({
  id: true,
  username: true,
  displayName: true,
  role: true,
  verified: true,
}).extend({ hasUniversity: z.boolean() });

export type SessionUserSchema = z.infer<typeof SessionUserSchema>;
