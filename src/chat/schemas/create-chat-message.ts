import { z } from 'zod/v4';

export const CreateChatMessageSchema = z.object({
  content: z.string().trim().nonempty(),
});

export type CreateChatMessageSchema = z.infer<typeof CreateChatMessageSchema>;
