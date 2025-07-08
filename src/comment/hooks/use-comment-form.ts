import { useApiClient } from '@/api/hooks/use-api-client';
import { usePendingCallback } from '@/common/hooks/use-pending';
import { usePopup } from '@/common/hooks/use-popup';
import { zodResolver } from '@hookform/resolvers/zod';
import { isErrorFromAlias } from '@zodios/core';
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
      try {
        if (parentId) {
          await apiClient.createPostCommentReply(data, {
            params: { id: postId, parentId },
          });
        } else {
          await apiClient.createPostComment(data, {
            params: { id: postId },
          });
        }

        await mutate(['comments', postId]);
        form.reset();
        onCancel?.();
      } catch (err) {
        if (
          isErrorFromAlias(apiClient.api, 'createPostComment', err) ||
          isErrorFromAlias(apiClient.api, 'createPostCommentReply', err)
        ) {
          openPopup('toxicityComment', {});
        } else {
          throw err;
        }
      }
    },
    [],
  );

  return { form, pending, handleSubmit };
};
