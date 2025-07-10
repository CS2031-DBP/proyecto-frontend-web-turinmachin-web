import {
  ErrorMessage,
  FieldValuesFromFieldErrors,
} from '@hookform/error-message';
import { TextareaHTMLAttributes } from 'react';
import {
  FieldErrors,
  FieldName,
  FieldValues,
  Path,
  UseFormReturn,
} from 'react-hook-form';
import { twJoin, twMerge } from 'tailwind-merge';
import { FormError } from './FormError';

export interface Props<T extends FieldValues>
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'form'> {
  form: UseFormReturn<T>;
  name: FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>> & Path<T>;
  label?: string;
}

export const FormTextArea = <T extends FieldValues>({
  form,
  label,
  name,
  required = true,
  disabled,
  minLength,
  maxLength,
  className,
  ...props
}: Props<T>) => {
  const { errors } = form.formState;

  return (
    <label className="my-4 block space-y-2">
      {label && (
        <div>
          <span className={twJoin(errors[name] && 'text-red-300')}>
            {label}
          </span>
          {!required && (
            <span className="text-foreground-muted"> (opcional)</span>
          )}
        </div>
      )}
      <textarea
        {...props}
        {...form.register(name, { required, disabled, minLength, maxLength })}
        required={required}
        className={twMerge(
          'border-muted focus:border-special disabled:bg-muted/20 block w-full resize-none rounded border px-3 py-2 focus:outline-none',
          errors[name] ? 'border-red-300' : 'border-muted',
          className,
        )}
      />
      <ErrorMessage name={name} errors={errors} render={FormError} />
    </label>
  );
};
