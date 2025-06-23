import { DependencyList, useEffect } from 'react';

export const useDebouncedEffect = (
  callback: () => void,
  delayMs: number,
  deps: DependencyList,
) => {
  useEffect(() => {
    const handle = setTimeout(callback, delayMs);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delayMs, ...deps]);
};
