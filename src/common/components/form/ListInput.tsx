import { LuPlus, LuX } from 'react-icons/lu';
import { useListInput } from '../../hooks/form/use-list-input';
import { Button } from '../Button';

export interface Props {
  label?: string;
  id?: string;
  values: string[];
  addValue: (value: string) => void;
  removeValue: (value: string) => void;
}

export const ListInput = ({
  label,
  id,
  values,
  addValue,
  removeValue,
}: Props) => {
  const { inputValue, setInputValue, handleKeyDown, handleAddValue } =
    useListInput({ values, addValue });

  return (
    <div className="my-4 block space-y-2">
      {label && (
        <label htmlFor={id} className="block">
          {label}
        </label>
      )}
      <div className="flex">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.trimStart())}
          placeholder="Añadir..."
          onKeyDown={handleKeyDown}
          id={id}
          className="form-input"
        />
        <Button
          type="button"
          onClick={handleAddValue}
          className="ml-2 rounded px-4 py-1"
        >
          <LuPlus className="inline size-6" />
        </Button>
      </div>
      <ul>
        {values.map((value) => (
          <li
            key={value}
            className="border-muted mb-2 flex items-center rounded border px-1 py-2"
          >
            <button
              type="button"
              onClick={() => removeValue(value)}
              className="text-muted hover:text-foreground px-2"
            >
              <LuX />
            </button>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
