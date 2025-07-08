import { z } from 'zod';
import { ChatMessageSchema } from './chat-message';

export const UnresolvedChatMessage = ChatMessageSchema.pick({
  content: true,
  author_id: true,
});

export type UnresolvedChatMessage = z.infer<typeof UnresolvedChatMessage>;
