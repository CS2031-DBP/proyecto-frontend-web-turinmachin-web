import { z } from 'zod';
import { UserSchema } from '../../user/schemas/user';

const BaseCommentSchema = z.object({
  id: z.string(),
  author: UserSchema,
  content: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type CommentSchema = z.infer<typeof BaseCommentSchema> & {
  replies: CommentSchema[];
};

export const CommentSchema: z.ZodType<CommentSchema> = BaseCommentSchema.extend(
  {
    replies: z.lazy(() => CommentSchema.array()),
  },
);
