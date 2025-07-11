import { SelfUserSchema } from '@/user/schemas/self-user';
import { z } from 'zod';

export const SessionUserSchema = SelfUserSchema.pick({
  id: true,
  username: true,
  displayName: true,
  role: true,
  verified: true,
  hasPassword: true,
}).extend({ hasUniversity: z.boolean() });

export type SessionUserSchema = z.infer<typeof SessionUserSchema>;
