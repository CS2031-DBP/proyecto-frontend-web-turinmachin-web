import { useInView } from 'framer-motion';
import { RefObject, useEffect } from 'react';

export const useViewTrigger = (
  ref: RefObject<Element | null>,
  triggerCondition: boolean,
  cb: () => void,
) => {
  const inView = useInView(ref);

  useEffect(() => {
    if (inView && triggerCondition) {
      cb();
    }
  }, [inView, triggerCondition, cb]);
};
