import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CreateChatMessageSchema } from '../schemas/create-chat-message';

export const FormSchema = CreateChatMessageSchema;
export type FormSchema = z.infer<typeof FormSchema>;

export const useChatForm = () => {
  const { apiClient } = useApiClient();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { content: '' },
  });

  const [pending, handleSubmit] = usePendingCallback(
    async (message: FormSchema) => {
      if (pending) return;

      form.reset();
      await apiClient.createChatMessage(message);
    },
    [apiClient],
  );

  return { form, pending, handleSubmit };
};
