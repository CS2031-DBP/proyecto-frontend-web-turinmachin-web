import { RegisterRequestSchema } from '@/auth/schemas/register-request';
import { z } from 'zod';

export const UpdateUserSchema = RegisterRequestSchema.pick({
  email: true,
  username: true,
  displayName: true,
}).extend({
  bio: z
    .string()
    .optional()
    .transform((s) => (!s ? undefined : s.trim())),
  degreeId: z
    .string()
    .optional()
    .transform((s) => (!s ? undefined : s.trim())),
});

export type UpdateUserSchema = z.infer<typeof UpdateUserSchema>;
