import { z } from 'zod';

export const UpdatePostSchema = z.object({
  content: z
    .string()
    .trim()
    .nonempty()
    .max(300, 'Tu post no puede tener más de 300 caracteres.'),
  tags: z.string().trim().nonempty().toLowerCase().array(),
});

export type UpdatePostSchema = z.infer<typeof UpdatePostSchema>;
