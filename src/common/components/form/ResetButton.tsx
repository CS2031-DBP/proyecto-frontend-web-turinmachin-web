import { MouseEvent } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { Button, Props as ButtonProps } from '../Button';

export interface Props<T extends FieldValues>
  extends Omit<ButtonProps, 'form'> {
  form: UseFormReturn<T>;
}

export const ResetButton = <T extends FieldValues>({
  form,
  className,
  children,
  ...props
}: Props<T>) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form.reset();
  };
  return (
    <Button
      type="reset"
      onClick={handleClick}
      variant="outline"
      className={twMerge('mr-4', className)}
      {...props}
    >
      {children}
    </Button>
  );
};
