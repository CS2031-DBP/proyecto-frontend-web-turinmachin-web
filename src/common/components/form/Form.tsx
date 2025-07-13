import { FormHTMLAttributes, useState } from 'react';
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';

export interface Props<F extends FieldValues, T>
  extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit: (data: T) => Promise<void>;
  form: UseFormReturn<F, unknown, T>;
}

export const Form = <F extends FieldValues, T>({
  form,
  onSubmit,
  children,
  ...props
}: Props<F, T>) => {
  const [error, setError] = useState<string | null>(null);

  const onValid: SubmitHandler<T> = async (data) => {
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
