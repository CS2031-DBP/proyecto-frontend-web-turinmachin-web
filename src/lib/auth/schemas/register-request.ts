import { z } from 'zod';

export const RegisterRequestSchema = z.object({
  email: z.string().trim().email('Correo inválido.'),
  username: z
    .string()
    .trim()
    .min(3, 'Tu nombre de usuario debe tener al menos 3 caracteres.')
    .max(50, 'Tu nombre de usuario no puede tener más de 50 caracteres.')
    .regex(
      /^[a-zA-Z0-9.\\-_]*$/,
      'Tu nombre de usuario solo puede contener letras, números y los símbolos ".-_"',
    )
    .trim(),
  displayName: z
    .string()
    .trim()
    .refine(
      (s) => s === '' || (s.length >= 3 && s.length <= 50),
      'Tu nombre real debe tener entre 3 y 50 caracteres',
    )
    .optional()
    .transform((s) => (!s ? undefined : s)),
  password: z
    .string()
    .min(4, 'Tu contraseña debe tener al menos 4 caracteres.'),
});

export type RegisterRequestSchema = z.infer<typeof RegisterRequestSchema>;
