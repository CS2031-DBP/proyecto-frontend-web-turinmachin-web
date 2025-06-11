import { z } from 'zod/v4';

export const RoleSchema = z.union([
  z.literal('ADMIN'),
  z.literal('MODERATOR'),
  z.literal('USER'),
]);

export type RoleSchema = z.infer<typeof RoleSchema>;
