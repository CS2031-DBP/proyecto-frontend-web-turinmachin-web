import { z } from 'zod';
import { ChatMessageSchema } from './chat-message';

export const DELETION_CAUSES = ['auto', 'moderator'] as const;

export const DeletionCause = z.enum(DELETION_CAUSES);
export type DeletionCause = z.infer<typeof DeletionCause>;

export const ChatMessageSchemaData = ChatMessageSchema.extend({
  deletionCause: z.boolean(),
});

export type ChatMessageSchemaData = z.infer<typeof ChatMessageSchemaData>;
