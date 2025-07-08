'use client';

import { type HTMLAttributes, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { useDropdown } from '../hooks/use-dropdown';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  buttonProps?: HTMLAttributes<HTMLButtonElement>;
  items: (ReactNode | false | undefined)[];
}

export const Dropdown = ({
  items,
  buttonProps: { className: buttonClassName, ...buttonProps } = {},
  className,
  children,
  ...props
}: Props) => {
  const { open, toggleOpen, buttonRef, menuRef } = useDropdown();

  return (
    <span {...props} className={twMerge(className, 'relative')}>
      <button
        {...buttonProps}
        ref={buttonRef}
        onClick={toggleOpen}
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
          className="bg-background-alt absolute top-12/10 right-0 z-25 overflow-hidden rounded-lg"
        >
          {items
            .filter((item) => !!item)
            .map((item, i) => (
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
