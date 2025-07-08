import { z } from 'zod';

export const CreateCommentSchema = z.object({
  content: z.string().nonempty(),
});

export type CreateCommentSchema = z.infer<typeof CreateCommentSchema>;
