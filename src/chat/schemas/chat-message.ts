import { z } from 'zod';

export const ChatMessageSchema = z.object({
  id: z.string(),
  from_id: z.string(),
  to_id: z.string(),
  content: z.string(),
  created_at: z.coerce.date(),
});

export type ChatMessageSchema = z.infer<typeof ChatMessageSchema>;
