'use client';

import { Button } from '@/common/components/Button';
import { Form } from '@/common/components/form/Form';
import { FormTextArea } from '@/common/components/form/FormTextArea';
import { Session } from 'next-auth';
import { type FormHTMLAttributes } from 'react';
import { useCommentForm } from '../hooks/use-comment-form';

export interface Props extends FormHTMLAttributes<HTMLFormElement> {
  postId: string;
  parentId?: string;
  submitLabel?: string;
  autoFocusInput?: boolean;
  onCancel?: () => void;
  session: Session | null;
}

export const CommentForm = ({
  postId,
  parentId,
  submitLabel = 'Comentar',
  autoFocusInput = false,
  onCancel,
  session,
  ...props
}: Props) => {
  const { form, pending, handleSubmit } = useCommentForm({
    postId,
    parentId,
    onCancel,
  });

  return (
    <Form {...props} form={form} onSubmit={handleSubmit}>
      <FormTextArea
        form={form}
        name="content"
        autoComplete="off"
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
