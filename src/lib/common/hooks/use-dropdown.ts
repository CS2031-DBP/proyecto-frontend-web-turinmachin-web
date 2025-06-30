import { useEffect, useRef, useState } from 'react';

export const useDropdown = () => {
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

  const toggleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return { open, toggleOpen, buttonRef, menuRef };
};
