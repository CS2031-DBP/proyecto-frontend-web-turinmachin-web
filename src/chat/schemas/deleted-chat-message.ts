import { z } from 'zod';

export const DeletedChatMessageSchema = z.object({
  id: z.string(),
});

export type DeletedChatMessageSchema = z.infer<typeof DeletedChatMessageSchema>;
