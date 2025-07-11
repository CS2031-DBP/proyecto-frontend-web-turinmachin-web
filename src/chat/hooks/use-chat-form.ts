import { usePendingCallback } from '@/common/hooks/use-pending';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CreateChatMessageSchema } from '../schemas/create-chat-message';
import { useSupabase } from './use-supabase';

export interface UseChatFormOptions {
  recipientId: string;
}

export const FormSchema = CreateChatMessageSchema;
export type FormSchema = z.infer<typeof FormSchema>;

export const useChatForm = ({ recipientId }: UseChatFormOptions) => {
  const { supabase } = useSupabase();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { content: '' },
  });

  const [pending, handleSubmit] = usePendingCallback(
    async (message: FormSchema) => {
      if (pending) return;

      form.reset();

      await supabase.from('messages').insert({
        content: message.content,
        to_id: recipientId,
      });
    },
    [supabase],
  );

  return { form, pending, handleSubmit };
};
