import { z } from 'zod';

export const UpdatePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z
    .string()
    .min(4, 'Tu contraseña debe tener al menos 4 caracteres.'),
});

export type UpdatePasswordSchema = z.infer<typeof UpdatePasswordSchema>;
