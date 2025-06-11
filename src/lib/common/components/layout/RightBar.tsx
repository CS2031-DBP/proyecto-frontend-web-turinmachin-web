import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import { NavLink } from 'react-router';
import { usePostPopup } from '../../../post/hooks/use-post-popup';

export type Props = HTMLAttributes<HTMLDivElement>;

export const RightBar = ({ className, ...props }: Props) => {
  const { openPopup } = usePostPopup();

  return (
    <aside {...props} className={clsx(className, 'px-4 py-4')}>
      <NavLink
        to="/login"
        className="bg-special hover:bg-special-muted rounded-full px-5 py-2 font-semibold text-nowrap"
      >
        Log in
      </NavLink>

      <button
        onClick={openPopup}
        className="bg-special hover:bg-special-muted rounded-full px-5 py-2 font-semibold text-nowrap"
      >
        Post
      </button>
    </aside>
  );
};
