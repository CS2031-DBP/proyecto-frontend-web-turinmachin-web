import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';

export type Props = HTMLAttributes<HTMLButtonElement>;

export const SubmitButton = ({ children, className, ...props }: Props) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      {...props}
      className={clsx(className, 'disabled:brightness-50')}
    >
      {children}
    </button>
  );
};
