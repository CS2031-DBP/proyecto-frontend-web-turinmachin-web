import { useApiClient } from '@/api/hooks/use-api-client';
import { usePendingCallback } from '@/common/hooks/use-pending';
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (message: FormSchema) => {
      if (pending) return;

      form.reset();
    },
    [apiClient],
  );

  return { form, pending, handleSubmit };
};
