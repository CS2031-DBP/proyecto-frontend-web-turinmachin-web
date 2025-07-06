'use client';

import { useEffect, useRef, useState } from 'react';
import { LuSend } from 'react-icons/lu';

interface Props {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export const AIMessageInput = ({ onSend, disabled }: Props) => {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      onSend(trimmed);
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-2xl items-center gap-2 px-4 py-2"
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        className="form-input flex-1 resize-none overflow-hidden"
        placeholder="Escribe tu mensaje..."
        disabled={disabled}
        style={{ minHeight: '2.5rem', maxHeight: '12rem' }}
      />
      <button
        type="submit"
        className="button-special"
        disabled={disabled || value.trim() === ''}
      >
        <LuSend className="h-5 w-5" />
      </button>
    </form>
  );
};
