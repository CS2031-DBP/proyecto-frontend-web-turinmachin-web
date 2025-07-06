import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { zodResolver } from '@hookform/resolvers/zod';
import { Session } from 'next-auth';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AnyChatMessage } from '../schemas/any-chat-message';
import { CreateChatMessageSchema } from '../schemas/create-chat-message';
import { UnresolvedChatMessage } from '../schemas/unresolved-chat-message';

export interface UseChatFormOptions {
  session: Session;
  setMessages: Dispatch<SetStateAction<AnyChatMessage[]>>;
}

export const FormSchema = CreateChatMessageSchema;
export type FormSchema = z.infer<typeof FormSchema>;

export const useChatForm = ({ session, setMessages }: UseChatFormOptions) => {
  const { apiClient } = useApiClient();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { content: '' },
  });

  const [pending, handleSubmit] = usePendingCallback(
    async (message: FormSchema) => {
      if (pending) return;

      form.reset();

      const unresolvedMessage: UnresolvedChatMessage = {
        ...message,
        author_id: session.user.id,
      };
      setMessages((prevMessages) => [...prevMessages, unresolvedMessage]);
      await apiClient.createChatMessage(message);
    },
    [apiClient],
  );

  return { form, pending, handleSubmit };
};
