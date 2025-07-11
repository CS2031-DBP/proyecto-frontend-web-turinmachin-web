import { useApiClient } from '@/api/hooks/use-api-client';
import { usePendingCallback } from '@/common/hooks/use-pending';
import { usePopup } from '@/common/hooks/use-popup';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { z } from 'zod';
import { CreateCommentSchema } from '../schemas/create-comment';

export const FormSchema = CreateCommentSchema;
export type FormSchema = z.infer<typeof CreateCommentSchema>;

export interface UseCommentFormOptions {
  postId: string;
  parentId?: string;
  onCancel?: () => void;
}

export const useCommentForm = ({
  postId,
  parentId,
  onCancel,
}: UseCommentFormOptions) => {
  const { mutate } = useSWRConfig();
  const { apiClient } = useApiClient();
  const { openPopup } = usePopup();
  const form = useForm({ resolver: zodResolver(FormSchema) });

  const [pending, handleSubmit] = usePendingCallback(
    async (data: FormSchema) => {
      const response = await (parentId
        ? apiClient.createPostCommentReply({
            body: data,
            params: { id: postId, parentId },
          })
        : apiClient.createPostComment({ body: data, params: { id: postId } }));

      if (response.status === 403) {
        openPopup('toxicityComment', {});
        return;
      }

      await mutate(['comments', postId]);
      form.reset();
      onCancel?.();
    },
    [],
  );

  return { form, pending, handleSubmit };
};
