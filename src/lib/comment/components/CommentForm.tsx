'use client';

import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { Button } from '@/lib/common/components/Button';
import { Form } from '@/lib/common/components/form/Form';
import { FormTextArea } from '@/lib/common/components/form/FormTextArea';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { zodResolver } from '@hookform/resolvers/zod';
import { Session } from 'next-auth';
import { type FormHTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { z } from 'zod';
import { CreateCommentSchema } from '../schemas/create-comment';

export interface Props extends FormHTMLAttributes<HTMLFormElement> {
  postId: string;
  parentId?: string;
  submitLabel?: string;
  autoFocusInput?: boolean;
  onCancel?: () => void;
  session: Session | null;
}

const FormSchema = CreateCommentSchema;
type FormSchema = z.infer<typeof CreateCommentSchema>;

export const CommentForm = ({
  postId,
  parentId,
  submitLabel = 'Comentar',
  autoFocusInput = false,
  onCancel,
  session,
  ...props
}: Props) => {
  const { mutate } = useSWRConfig();
  const { apiClient } = useApiClient();

  const form = useForm({ resolver: zodResolver(FormSchema) });

  const [pending, handleSubmit] = usePendingCallback(
    async (data: FormSchema) => {
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
    },
    [],
  );

  return (
    <Form {...props} form={form} onSubmit={handleSubmit}>
      <FormTextArea
        form={form}
        name="content"
        placeholder={
          session === null
            ? '¡Inicia sesión para comentar!'
            : !session.user.verified
              ? '¡Verifica tu cuenta para comentar!'
              : parentId
                ? '¿Qué opinas de esta opinión?'
                : '¿Qué opinas?'
        }
        disabled={session === null || !session.user.verified}
        autoFocus={autoFocusInput}
      />
      <div className="text-right">
        {onCancel && (
          <Button variant="outline" onClick={onCancel} className="mr-4">
            Cancelar
          </Button>
        )}
        <Button
          disabled={pending || session === null || !session.user.verified}
        >
          {submitLabel}
        </Button>
      </div>
    </Form>
  );
};
