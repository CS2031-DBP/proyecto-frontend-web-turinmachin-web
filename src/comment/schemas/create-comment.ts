import { z } from 'zod';

export const CreateCommentSchema = z.object({
  content: z
    .string()
    .nonempty()
    .trim()
    .max(400, 'Tu comentario no puede tener más de 400 caracteres.'),
});

export type CreateCommentSchema = z.infer<typeof CreateCommentSchema>;
