import { z } from 'zod';
import { CreatePostSchema } from './create-post';

export const UpdatePostSchema = CreatePostSchema.pick({
  content: true,
  tags: true,
});

export type UpdatePostSchema = z.infer<typeof UpdatePostSchema>;
