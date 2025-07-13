import { RegisterRequestSchema } from '@/auth/schemas/register-request';
import { z } from 'zod';

export const UpdateUserSchema = RegisterRequestSchema.pick({
  email: true,
  username: true,
  displayName: true,
}).extend({
  birthday: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.coerce
      .date()
      .min(new Date('1900-01-01'), '¿Naciste antes de 1900? :o')
      .max(new Date(), 'No puedes no haber nacido todavía.')
      .optional(),
  ),
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
