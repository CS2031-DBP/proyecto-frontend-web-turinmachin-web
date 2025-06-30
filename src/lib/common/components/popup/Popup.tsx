'use client';

import { HTMLAttributes } from 'react';
import { LuX } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';
import { useOnClickOutside } from '../../hooks/use-on-click-outside';
import { usePopup } from '../../hooks/use-popup';
import { PopupFooter } from './PopupFooter';
import { PopupTitle } from './PopupTitle';

export type Props = HTMLAttributes<HTMLDivElement>;

const Popup = ({ className, children, ...props }: Props) => {
  const { closePopup } = usePopup();

  useOnClickOutside('#popup', closePopup);

  return (
    <div
      {...props}
      className="bg-foreground/5 fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center backdrop-blur-xs"
    >
      <div
        id="popup"
        className={twMerge(
          'bg-background border-muted relative w-full rounded-xl border px-4 py-6',
          className,
        )}
        {...props}
      >
        <button
          onClick={closePopup}
          className="text-muted hover:text-foreground-muted absolute top-3 right-3 transition-colors ease-in-out"
        >
          <LuX className="h-6 w-6" />
        </button>
        <div className="max-h-[90vh] overflow-y-scroll px-4">{children}</div>
      </div>
    </div>
  );
};

Popup.Title = PopupTitle;
Popup.Footer = PopupFooter;

export { Popup };
