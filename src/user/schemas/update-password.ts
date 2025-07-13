import { z } from 'zod/v4';

export const UpdatePasswordSchema = z.object({
  currentPassword: z.string().optional(),
  newPassword: z
    .string()
    .min(6, 'Tu contraseña debe tener al menos 6 caracteres.'),
});

export type UpdatePasswordSchema = z.infer<typeof UpdatePasswordSchema>;
