import { z } from 'zod/v4';

export const ChatMessageSchema = z.object({
  id: z.string(),
  from_id: z.string(),
  to_id: z.string(),
  content: z.string(),
  read: z.boolean(),
  created_at: z.coerce.date(),
});

export type ChatMessageSchema = z.infer<typeof ChatMessageSchema>;
