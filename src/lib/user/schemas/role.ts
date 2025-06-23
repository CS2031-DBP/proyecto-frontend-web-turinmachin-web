import { z } from 'zod';

export const RoleSchema = z.enum(['ADMIN', 'MODERATOR', 'USER']);

export type RoleSchema = z.infer<typeof RoleSchema>;
