'use client';

import { useOnClickOutside } from '@/common/hooks/use-on-click-outside';
import { HTMLAttributes } from 'react';
import { LuX } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';
import { usePopup } from '../../hooks/use-popup';
import { PopupFooter } from './PopupFooter';
import { PopupTitle } from './PopupTitle';

export type Props = HTMLAttributes<HTMLDivElement> & {
  disableClickOutside?: boolean;
};

const Popup = ({
  className,
  children,
  disableClickOutside = false,
  ...props
}: Props) => {
  const { closePopup } = usePopup();

  useOnClickOutside('#popup', closePopup, disableClickOutside);

  return (
    <div
      className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50 backdrop-blur-xs"
      {...props}
    >
      <div
        id="popup"
        className={twMerge(
          'bg-background border-muted relative w-full rounded-xl border px-4 py-6',
          className,
        )}
      >
        <button
          onClick={closePopup}
          className="text-foreground-muted hover:text-foreground absolute top-3 right-3 transition-colors ease-in-out"
        >
          <LuX className="h-6 w-6" />
        </button>
        <div className="max-h-[90vh] overflow-y-auto px-4">{children}</div>
      </div>
    </div>
  );
};

Popup.Title = PopupTitle;
Popup.Footer = PopupFooter;

export { Popup };
