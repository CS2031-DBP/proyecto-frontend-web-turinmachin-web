import { ChangeEvent, useState } from 'react';
import { DegreeSchema } from '../schemas/degree';

export interface UseDegreeSelectorOptions {
  options: DegreeSchema[];
  degreeIds: string[];
  setDegreeIds: (degrees: string[]) => void;
}

export const useDegreeSelector = ({
  options,
  degreeIds,
  setDegreeIds,
}: UseDegreeSelectorOptions) => {
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

  return { inputValue, handleChange, removeDegreeId };
};
