import { z } from 'zod/v4';

export const RoleSchema = z.enum(['ADMIN', 'MODERATOR', 'USER']);

export type RoleSchema = z.infer<typeof RoleSchema>;
