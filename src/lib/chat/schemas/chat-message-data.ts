import { z } from 'zod';

export const DELETION_CAUSES = ['auto', 'moderator'] as const;

export const DeletionCause = z.enum(DELETION_CAUSES);
export type DeletionCause = z.infer<typeof DeletionCause>;
