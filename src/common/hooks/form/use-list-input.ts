import { KeyboardEvent, useState } from 'react';

export interface UseListInputOptions {
  values: string[];
  addValue: (value: string) => void;
}

export const useListInput = ({ values, addValue }: UseListInputOptions) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddValue = () => {
    if (!inputValue) return;

    if (!values.includes(inputValue)) {
      addValue(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddValue();
    }
  };

  return { inputValue, setInputValue, handleKeyDown, handleAddValue };
};
