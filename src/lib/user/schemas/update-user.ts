import { z } from 'zod';

export const UpdateUserSchema = z.object({
  email: z.string().email('Correo inválido.').trim(),
  username: z
    .string()
    .min(3, 'Tu nombre de usuario debe tener al menos 3 caracteres.')
    .trim(),
  displayName: z
    .union([
      z.string().length(0, 'Tu nombre real debe tener al menos 3 caracteres.'),
      z.string().min(3, 'Tu nombre real debe tener al menos 3 caracteres.'),
    ])
    .optional()
    .transform((s) => (!s ? undefined : s.trim())),
  bio: z
    .string()
    .optional()
    .transform((s) => (!s ? undefined : s.trim())),
  universityId: z
    .string()
    .optional()
    .transform((s) => (!s ? undefined : s.trim())),
  degreeId: z
    .string()
    .optional()
    .transform((s) => (!s ? undefined : s.trim())),
});

export type UpdateUserSchema = z.infer<typeof UpdateUserSchema>;
