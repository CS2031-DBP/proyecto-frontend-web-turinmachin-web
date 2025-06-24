import { KeyboardEvent, useState } from 'react';
import { LuPlus, LuX } from 'react-icons/lu';
import { Button } from '../Button';

export interface Props {
  label?: string;
  values: string[];
  addValue: (value: string) => void;
  removeValue: (value: string) => void;
}

export const ListInput = ({ label, values, addValue, removeValue }: Props) => {
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

  return (
    <label className="my-4 block space-y-2">
      {label && <div>{label}</div>}
      <ul>
        {values.map((value) => (
          <li
            key={value}
            className="border-muted mb-2 flex items-center rounded border px-1 py-2"
          >
            <button
              onClick={() => removeValue(value)}
              className="text-muted hover:text-foreground px-2"
            >
              <LuX />
            </button>
            <span>{value}</span>
          </li>
        ))}
      </ul>
      <div className="flex">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.trimStart())}
          placeholder="Añadir..."
          onKeyDown={handleKeyDown}
          className="form-input"
        />
        <Button onClick={handleAddValue} className="ml-2 rounded px-4 py-1">
          <LuPlus className="inline size-6" />
        </Button>
      </div>
    </label>
  );
};
