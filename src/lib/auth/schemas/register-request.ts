import { z } from 'zod';

export const RegisterRequestSchema = z.object({
  email: z.string().email('Correo inválido.'),
  username: z
    .string()
    .min(3, 'Tu nombre de usuario debe tener al menos 3 caracteres.')
    .min(50, 'Tu nombre de usuario no puede tener más de 50 caracteres.')
    .regex(
      /^[a-zA-Z0-9.\\-_]*$/,
      'Tu nombre de usuario solo puede contener letras, números y los símbolos ".-_"',
    )
    .trim(),
  displayName: z
    .union([
      z.string().length(0, 'Tu nombre real debe tener al menos 3 caracteres.'),
      z
        .string()
        .min(3, 'Tu nombre real debe tener al menos 3 caracteres.')
        .min(50, 'Tu nombre real no puede tener más de 50 caracteres.'),
    ])
    .optional()
    .transform((s) => (!s ? undefined : s.trim())),
  password: z
    .string()
    .min(4, 'Tu contraseña debe tener al menos 4 caracteres.'),
});

export type RegisterRequestSchema = z.infer<typeof RegisterRequestSchema>;
