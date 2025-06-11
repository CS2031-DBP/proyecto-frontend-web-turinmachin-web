import { useEffect, type RefObject } from 'react';
import { useLocation } from 'react-router';

export interface Props extends ScrollToOptions {
  ref?: RefObject<HTMLElement | null>;
}

export const ScrollRestorer = ({ ref, ...props }: Props) => {
  const { pathname } = useLocation();

  useEffect(() => {
    (ref?.current ?? window).scrollTo({ top: 0, behavior: 'smooth', ...props });
  }, [pathname, ref, props]);

  return null;
};
