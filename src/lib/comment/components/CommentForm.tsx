import { useState, type FormEvent, type FormHTMLAttributes } from 'react';
import { SubmitButton } from '../../common/components/layout/SubmitButton';

export interface Props extends FormHTMLAttributes<HTMLFormElement> {
  submitLabel?: string;
  autoFocusInput?: boolean;
  onCancel?: () => void;
  onSubmitContent: (content: string) => Promise<void>;
}

export const CommentForm = ({
  submitLabel = 'Comentar',
  autoFocusInput = false,
  onCancel,
  onSubmitContent,
  ...props
}: Props) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();

    await onSubmitContent(content.trim());
    setContent('');
    onCancel?.();
  };

  return (
    <form {...props} onSubmit={handleSubmit}>
      <textarea
        onChange={(ev) => setContent(ev.target.value.trimStart())}
        value={content}
        placeholder="¿Qué opinas?"
        autoFocus={autoFocusInput}
        className="border-foreground-muted my-3 block w-full rounded-lg border px-2 py-1"
      />
      <div className="text-right">
        {onCancel && (
          <button
            onClick={onCancel}
            className="border-foreground mr-3 rounded-full border px-3 py-1 font-semibold enabled:cursor-pointer disabled:brightness-75"
          >
            Cancelar
          </button>
        )}
        <SubmitButton className="bg-foreground text-background rounded-full px-3 py-1 font-semibold enabled:cursor-pointer disabled:brightness-75">
          {submitLabel}
        </SubmitButton>
      </div>
    </form>
  );
};
