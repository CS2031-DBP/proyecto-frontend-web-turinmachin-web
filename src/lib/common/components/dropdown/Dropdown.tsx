'use client';

import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { twMerge } from 'tailwind-merge';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  buttonProps?: HTMLAttributes<HTMLButtonElement>;
  items: ReactNode[];
}

export const Dropdown = ({
  items,
  buttonProps: { className: buttonClassName, ...buttonProps } = {},
  className,
  children,
  ...props
}: Props) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (ev: MouseEvent) => {
      if (
        !menuRef.current?.contains(ev.target as Node) &&
        !buttonRef.current?.contains(ev.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpenerClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <span {...props} className={twMerge(className, 'relative')}>
      <button
        {...buttonProps}
        ref={buttonRef}
        onClick={handleOpenerClick}
        aria-haspopup
        aria-expanded={open}
        aria-controls="dropdown-menu"
        className={twMerge(
          buttonClassName,
          'hover:bg-background-alt flex items-center justify-center rounded-full',
        )}
      >
        {children}
      </button>
      {open && (
        <ul
          ref={menuRef}
          id="dropdown-menu"
          role="menu"
          className="bg-background-alt [&>*]:hover:bg-muted [&>*]:hover:text-foreground absolute top-12/10 right-0 z-25 overflow-hidden rounded-lg [&>*]:block"
        >
          {items.map((item, i) => (
            <li
              key={i}
              className="[&>*]: [&>*]:block [&>*]:px-4 [&>*]:py-2 [&>*]:text-nowrap"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </span>
  );
};
