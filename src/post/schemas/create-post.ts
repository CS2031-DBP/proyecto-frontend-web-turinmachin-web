import z from 'zod';
import { TagSchema } from './post-tag';

export const CreatePostSchema = z.object({
  content: z
    .string()
    .trim()
    .nonempty()
    .max(300, 'Tu post no puede tener más de 300 caracteres.')
    .transform((s) => s.replaceAll(/(\r\n|\r|\n)+/g, '\n')),
  tags: TagSchema.array()
    .optional()
    .transform((arr) => (arr?.length === 0 ? undefined : arr)),
  files: z
    .instanceof(File)
    .array()
    .max(10)
    .optional()
    .transform((arr) => (arr?.length === 0 ? undefined : arr)),
});

export type CreatePostSchema = z.infer<typeof CreatePostSchema>;
