'use client';

import { useState, type HTMLAttributes } from 'react';
import { LuLink } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';

export interface Props extends HTMLAttributes<HTMLButtonElement> {
  text: string;
  label: string;
}

export const CopyButton = ({ text, label, className, ...props }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={twMerge(
        className,
        copied && 'bg-success-background text-success-foreground',
      )}
    >
      <LuLink className="mr-2 inline" />
      {copied ? '¡Copiado!' : label}
    </button>
  );
};
