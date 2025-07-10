import z from 'zod';

export const CreatePostSchema = z.object({
  content: z
    .string()
    .trim()
    .nonempty()
    .max(300, 'Tu post no puede tener más de 300 caracteres.'),
  tags: z
    .string()
    .toLowerCase()
    .nonempty()
    .array()
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
