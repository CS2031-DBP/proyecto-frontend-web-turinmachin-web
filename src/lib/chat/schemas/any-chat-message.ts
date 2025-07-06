import { z } from 'zod';
import { ChatMessageSchema } from './chat-message';
import { UnresolvedChatMessage } from './unresolved-chat-message';

export const AnyChatMessage = z.union([
  ChatMessageSchema,
  UnresolvedChatMessage,
]);

export type AnyChatMessage = z.infer<typeof AnyChatMessage>;
