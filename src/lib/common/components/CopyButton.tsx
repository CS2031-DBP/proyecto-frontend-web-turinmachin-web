import clsx from 'clsx';
import { useState, type HTMLAttributes, type MouseEvent } from 'react';
import { LuLink } from 'react-icons/lu';

export interface Props extends HTMLAttributes<HTMLButtonElement> {
  text: string;
  label: string;
}

export const CopyButton = ({ text, label, className, ...props }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleClick = (ev: MouseEvent) => {
    ev.stopPropagation();
    navigator.clipboard?.writeText(text);
    setCopied(true);
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={clsx(className, copied && 'bg-green-800/10 text-green-200')} // TODO: use palette
    >
      <LuLink className="mr-2 inline" />
      {copied ? '¡Copiado!' : label}
    </button>
  );
};
