import { z } from 'zod';
import { DeletionCause } from './chat-message-data';

export const ChatMessageSchema = z.object({
  id: z.string(),
  author_id: z.string(),
  content: z.string(),
  created_at: z.coerce.date(),
  deleted: DeletionCause.optional(),
});

export type ChatMessageSchema = z.infer<typeof ChatMessageSchema>;
