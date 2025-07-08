import { z } from 'zod';

export const AuthorRoleSchema = z.enum([
  'SYSTEM',
  'USER',
  'ASSISTANT',
  'TOOL',
  'DEVELOPER',
]);

export type AuthorRoleSchema = z.infer<typeof AuthorRoleSchema>;
