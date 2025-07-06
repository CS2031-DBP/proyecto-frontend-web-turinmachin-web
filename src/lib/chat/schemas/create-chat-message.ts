import { z } from 'zod';

export const CreateChatMessageSchema = z.object({
  content: z.string().trim().nonempty(),
});

export type CreateChatMessageSchema = z.infer<typeof CreateChatMessageSchema>;
