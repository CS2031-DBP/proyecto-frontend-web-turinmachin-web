import { z } from 'zod';

export const UpdatePostSchema = z.object({
  content: z.string().trim().nonempty(),
  tags: z.string().trim().nonempty().toLowerCase().array(),
});

export type UpdatePostSchema = z.infer<typeof UpdatePostSchema>;
