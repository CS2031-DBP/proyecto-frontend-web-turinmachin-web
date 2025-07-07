import { RefObject, useEffect } from 'react';

export const useViewTrigger = (
  ref: RefObject<Element | null>,
  triggerCondition: boolean,
  cb: () => void,
) => {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && triggerCondition) {
        cb();
      }
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [triggerCondition, cb, ref]);
};
