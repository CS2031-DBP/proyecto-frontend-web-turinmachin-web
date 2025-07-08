import { z } from 'zod';
import { AuthorRoleSchema } from './author-role';

export const AIMessageResponseSchema = z.object({
  id: z.string(),
  role: AuthorRoleSchema,
  content: z.string(),
  createdAt: z.coerce.date(),
});

export type AIMessageResponseSchema = z.infer<typeof AIMessageResponseSchema>;
