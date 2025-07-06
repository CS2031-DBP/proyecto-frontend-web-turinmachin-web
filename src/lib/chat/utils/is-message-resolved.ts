import { AnyChatMessage } from '../schemas/any-chat-message';
import { ChatMessageSchema } from '../schemas/chat-message';

export const isMessageResolved = (
  message: AnyChatMessage,
): message is ChatMessageSchema => 'id' in message;
