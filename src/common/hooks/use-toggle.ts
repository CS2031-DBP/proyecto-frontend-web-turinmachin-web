'use client';

import { useState } from 'react';

export const useToggle = (
  initial: boolean = false,
): [boolean, (force?: boolean) => void] => {
  const [value, setValue] = useState(initial);

  const toggleValue = (force?: boolean) => {
    if (force !== undefined) {
      setValue(force);
    } else {
      setValue((prev) => !prev);
    }
  };

  return [value, toggleValue];
};
