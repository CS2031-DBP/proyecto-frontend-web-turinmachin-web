import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import { NavLink } from 'react-router-dom';

export type Props = HTMLAttributes<HTMLDivElement>;

export const RightBar = ({ className, ...props }: Props) => (
  <aside {...props} className={clsx(className, 'mx-4 my-4')}>
    <NavLink
      to="/login"
      className="bg-special hover:bg-special-muted rounded-full px-5 py-2 font-semibold text-nowrap"
    >
      Log in
    </NavLink>
  </aside>
);
