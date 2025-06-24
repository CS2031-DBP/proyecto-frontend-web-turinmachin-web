import { ChangeEvent, useState } from 'react';
import { LuX } from 'react-icons/lu';
import { DegreeSchema } from '../schemas/degree';

export interface Item<T> {
  key: string;
  label: string;
  value: T;
}

export interface Props {
  options: DegreeSchema[];
  degreeIds: string[];
  setDegreeIds: (degrees: string[]) => void;
}

export const DegreeSelector = ({ options, degreeIds, setDegreeIds }: Props) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const typedDegree = options.find((deg) => deg.name === e.target.value);

    if (!typedDegree) {
      setInputValue(e.target.value);
    } else if (!degreeIds.some((id) => id === typedDegree.id)) {
      setDegreeIds([...degreeIds, typedDegree.id]);
      setInputValue('');
    }
  };

  const removeDegreeId = (degreeId: string) => {
    setDegreeIds(degreeIds.filter((id) => id !== degreeId));
  };

  return (
    <div className="my-4">
      <label>
        <div className="mb-2">Carreras</div>

        <input
          list="degrees"
          placeholder="Busca una carrera..."
          value={inputValue}
          onChange={handleChange}
          className="form-input"
        />
      </label>
      <datalist id="degrees">
        {options.map((degree) => (
          <option key={degree.name} value={degree.name} />
        ))}
      </datalist>
      <ul className="my-2 space-y-2">
        {degreeIds.map((id) => {
          const degree = options.find((d) => d.id === id)!;
          return (
            <li
              key={id}
              className="border-muted flex items-center rounded border px-3 py-2"
            >
              <button
                type="button"
                onClick={() => removeDegreeId(id)}
                className="text-foreground-muted hover:text-foreground"
              >
                <LuX className="mr-2" />
              </button>
              <span>{degree.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
