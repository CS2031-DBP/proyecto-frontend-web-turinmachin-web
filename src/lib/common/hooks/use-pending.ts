'use client';

import { DependencyList, useCallback, useState } from 'react';

export const usePendingCallback = <T, A extends unknown[]>(
  callback: (...args: A) => Promise<T>,
  deps: DependencyList,
): [pending: boolean, cb: (...args: A) => Promise<T>] => {
  const [pending, setPending] = useState(false);

  const newCallback = useCallback(
    async (...args: A) => {
      setPending(true);

      try {
        return await callback(...args);
      } finally {
        setPending(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...deps],
  );

  return [pending, newCallback];
};
