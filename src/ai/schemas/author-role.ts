import { z } from 'zod/v4';

export const AuthorRoleSchema = z.enum([
  'SYSTEM',
  'USER',
  'ASSISTANT',
  'TOOL',
  'DEVELOPER',
]);

export type AuthorRoleSchema = z.infer<typeof AuthorRoleSchema>;
