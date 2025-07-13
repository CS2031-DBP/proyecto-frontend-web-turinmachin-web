import { z } from 'zod/v4';
import { UserSchema } from '../../user/schemas/user';

export const CommentSchema = z.object({
  id: z.string(),
  author: UserSchema,
  content: z.string(),
  get replies() {
    return z.array(CommentSchema);
  },
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type CommentSchema = z.infer<typeof CommentSchema>;
