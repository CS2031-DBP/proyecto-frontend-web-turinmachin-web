import { z } from 'zod';

export const CreateCommentSchema = z.object({
  content: z
    .string()
    .trim()
    .nonempty()
    .max(400, 'Tu comentario no puede tener más de 400 caracteres.')
    .transform((s) => s.replaceAll(/(\r\n|\r|\n)+/g, '\n')),
});

export type CreateCommentSchema = z.infer<typeof CreateCommentSchema>;
