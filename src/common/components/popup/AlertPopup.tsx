'use client';
import { Button } from '@/common/components/Button';
import { Popup } from '@/common/components/popup/Popup';
import type { IconType } from 'react-icons';

export interface AlertPopupProps {
  title: string;
  message: string;
  Icon: IconType;
  onClose: () => void;
  buttonText?: string;
}

export const AlertPopup = ({
  title,
  message,
  Icon,
  onClose,
  buttonText = 'Continuar',
}: AlertPopupProps) => {
  return (
    <Popup className="bg-surface border-background-alt relative w-full max-w-sm rounded-xl border px-4 py-6">
      <div className="text-special mb-2 flex justify-center">
        <Icon className="h-10 w-10" />
      </div>

      <h2 className="mb-2 text-center text-xl font-bold">{title}</h2>

      <p className="text-center">{message}</p>

      <Button
        onClick={onClose}
        variant="special"
        className="my-3 w-full rounded font-bold text-white transition-colors ease-in-out"
      >
        {buttonText}
      </Button>
    </Popup>
  );
};
