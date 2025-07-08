import {
  ErrorMessage,
  FieldValuesFromFieldErrors,
} from '@hookform/error-message';
import { InputHTMLAttributes, LabelHTMLAttributes } from 'react';
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
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'form'> {
  form: UseFormReturn<T>;
  name: FieldName<FieldValuesFromFieldErrors<FieldErrors<T>>> & Path<T>;
  label?: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
}

export const FormInput = <T extends FieldValues>({
  form,
  label,
  name,
  required = true,
  disabled,
  minLength,
  maxLength,
  min,
  max,
  labelProps,
  className,
  children,
  ...props
}: Props<T>) => {
  const { errors } = form.formState;

  return (
    <label
      {...labelProps}
      className={twMerge('my-4 block space-y-2', labelProps?.className)}
    >
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
      <input
        {...props}
        {...form.register(name, {
          required,
          disabled,
          minLength,
          maxLength,
          min,
          max,
        })}
        required={required}
        className={twMerge(
          'form-input block w-full',
          errors[name] && 'border-red-300',
          className,
        )}
      />
      {children}
      <ErrorMessage name={name} errors={errors} render={FormError} />
    </label>
  );
};
