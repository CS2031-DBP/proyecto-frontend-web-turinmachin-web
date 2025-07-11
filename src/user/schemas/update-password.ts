import { z } from 'zod';

export const UpdatePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z
    .string()
    .min(6, 'Tu contraseña debe tener al menos 6 caracteres.'),
});

export type UpdatePasswordSchema = z.infer<typeof UpdatePasswordSchema>;
