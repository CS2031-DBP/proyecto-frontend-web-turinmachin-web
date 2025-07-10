import { useState } from 'react';

export interface UseTagInputOptions {
  value: string[];
  setValue: (tags: string[]) => void;
}

export const useTagInput = ({ value, setValue }: UseTagInputOptions) => {
  const [tagInput, setTagInput] = useState('');

  const addCurrent = () => {
    const clean = tagInput.trim().toLowerCase();
    if (clean.length === 0 || value.includes(clean)) return;

    setValue([...value, clean]);
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setValue(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (['Enter', ' '].includes(ev.key)) {
      ev.preventDefault();
      addCurrent();
    } else if (
      value.length !== 0 &&
      tagInput.length === 0 &&
      ev.key === 'Backspace'
    ) {
      removeTag(value[value.length - 1]);
    }
  };

  return { tagInput, setTagInput, handleKeyDown, removeTag, addCurrent };
};
