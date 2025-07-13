import { UpdatePasswordSchema } from '@/user/schemas/update-password';
import { z } from 'zod/v4';

export const ResetPasswordSchema = UpdatePasswordSchema.pick({
  newPassword: true,
}).extend({
  token: z.string(),
});

export type ResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;
