import z from 'zod';

export const CreatePostSchema = z.object({
  content: z.string().trim().nonempty(),
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
