import clsx from 'clsx';
import { useState, type HTMLAttributes } from 'react';
import {
  LuBell,
  LuCirclePlus,
  LuGraduationCap,
  LuHouse,
  LuSearch,
  LuUser,
} from 'react-icons/lu';
import { NavLink, useLocation } from 'react-router';
import { LoginPopup } from '../../../auth/components/LoginPopup';
import { StreakWidget } from '../../widgets/StreakWidget';

const links = [
  {
    to: '/',
    label: 'Inicio',
    Icon: LuHouse,
    exact: true,
  },
  {
    to: '/explore',
    label: 'Explorar',
    Icon: LuSearch,
  },
  {
    to: '/notifications',
    label: 'Notificaciones',
    Icon: LuBell,
  },
  {
    to: '/account',
    label: 'Mi cuenta',
    Icon: LuUser,
  },
];

export type Props = HTMLAttributes<HTMLDivElement>;

export const LeftBar = ({ className, ...props }: Props) => {
  const location = useLocation();
  const loggedIn = false;
  const [streak] = useState(1);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <aside {...props} className={clsx(className, 'flex flex-col px-6 py-4')}>
      <NavLink
        to="/"
        className="my-3 flex items-center text-4xl font-extrabold"
      >
        <LuGraduationCap className="mr-3 h-full w-auto"></LuGraduationCap>
        UniLife
      </NavLink>

      <div className="border-background-alt bg-surface my-2 mb-3 flex items-center rounded-full border px-5 py-3 shadow-sm">
        <LuSearch className="text-muted mr-2 size-5" />
        <input
          type="text"
          placeholder="Buscar..."
          className="placeholder-muted w-full bg-transparent outline-none"
        />
      </div>

      <nav className="block grow">
        {links.map((link) => {
          const isActive = link.exact
            ? location.pathname === link.to
            : location.pathname.startsWith(link.to);

          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={clsx(
                'hover:bg-background-alt my-3 flex items-center rounded-full px-4 py-2.5 text-xl text-nowrap transition-colors duration-400 ease-in-out',
                isActive && 'text-special',
              )}
            >
              <link.Icon
                className={clsx('mr-2', isActive && 'fill-current')}
                size={30}
              />
              <div>{link.label}</div>
            </NavLink>
          );
        })}
      </nav>

      {loggedIn && (
        <NavLink
          to="/post"
          className="bg-special hover:bg-special-muted my-3 flex items-center justify-center rounded-full px-4 py-4 text-xl font-semibold text-nowrap text-white transition-colors ease-in-out"
        >
          <LuCirclePlus className="mr-2 inline" />
          Publicar
        </NavLink>
      )}

      {loggedIn ? (
        <div className="border-background-alt flex border-t pt-4 pr-3">
          <div className="flex grow items-center space-x-3 px-2">
            <LuUser />
            <div>
              <p className="font-semibold">Username</p>
              <p className="text-muted text-sm">UTEC - Computer Science</p>
            </div>
          </div>
          <StreakWidget streak={streak} />
        </div>
      ) : (
        <>
          <button
            onClick={() => setShowLogin(true)}
            className="bg-special hover:bg-special-muted flex items-center justify-center rounded-full px-4 py-4 text-xl font-semibold text-nowrap text-white transition-colors ease-in-out"
          >
            Iniciar sesión
          </button>
          {showLogin && <LoginPopup onClose={() => setShowLogin(false)} />}
        </>
      )}
    </aside>
  );
};
