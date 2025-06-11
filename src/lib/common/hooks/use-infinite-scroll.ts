import { useEffect, useRef } from 'react';

export function useInfiniteScroll(
  callback: () => void,
  canLoad: boolean,
  loading: boolean,
) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || !canLoad || loading) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [callback, canLoad, loading]);

  return ref;
}
