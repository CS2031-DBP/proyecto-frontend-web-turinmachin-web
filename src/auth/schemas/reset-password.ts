import { z } from 'zod';

export const ResetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string(),
});

export type ResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;
