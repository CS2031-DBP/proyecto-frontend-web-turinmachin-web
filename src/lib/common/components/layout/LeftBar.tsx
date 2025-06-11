import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import { LuHouse } from 'react-icons/lu';
import { NavLink, useLocation } from 'react-router';

const links = [
  {
    to: '/',
    label: 'Home',
    Icon: LuHouse,
  },
  {
    to: '/explore',
    label: 'Explore',
    Icon: LuHouse,
  },
];

export type Props = HTMLAttributes<HTMLDivElement>;

export const LeftBar = ({ className, ...props }: Props) => {
  const location = useLocation();

  return (
    <aside {...props} className={clsx(className, 'px-6 py-4')}>
      <NavLink to="/" className="mb-4 block text-3xl font-extrabold">
        UniLife
      </NavLink>
      <nav className="block">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={clsx(
              'hover:bg-background-alt my-2 block rounded-full px-4 py-2 text-xl text-nowrap',
              location.pathname === link.to && 'bg-background-alt',
            )}
          >
            <link.Icon className="mr-2 inline" size={30} />
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
