// use-on-click-outside.ts
import { useEffect } from 'react';

export const useOnClickOutside = (
  selector: string,
  callback: () => void,
  disabled: boolean = false,
) => {
  useEffect(() => {
    if (disabled) return;

    const clickHandler = (e: MouseEvent) => {
      if (e.target instanceof Element && !e.target.closest(selector)) {
        callback();
      }
    };

    document.addEventListener('click', clickHandler);
    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, [selector, callback, disabled]);
};
