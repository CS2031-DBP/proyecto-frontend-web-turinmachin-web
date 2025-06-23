import { FormHTMLAttributes, useState } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface Props<T extends FieldValues>
  extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit: (data: T) => Promise<void>;
  form: UseFormReturn<T>;
}

export const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  ...props
}: Props<T>) => {
  const [error, setError] = useState<string | null>(null);

  const onValid = async (data: T) => {
    setError(null);
    try {
      await onSubmit?.(data);
    } catch (err) {
      console.error(err);
      setError(typeof err === 'string' ? err : 'Algo salió mal :(');
    }
  };

  return (
    <form {...props} onSubmit={form.handleSubmit(onValid)}>
      {children}
      {error && (
        <p className="mt-2 rounded px-2 py-1 text-center font-semibold text-red-300">
          {error}
        </p>
      )}
    </form>
  );
};
