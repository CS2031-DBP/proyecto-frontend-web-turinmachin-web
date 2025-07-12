import { Button } from '@/common/components/Button';
import { Popup } from '@/common/components/popup/Popup';
import { ReactNode } from 'react';
import type { IconType } from 'react-icons';

export interface AlertPopupProps {
  children?: ReactNode;
  title: string;
  Icon: IconType;
  onClose: () => void;
  buttonText?: string;
}

export const AlertPopup = ({
  title,
  Icon,
  onClose,
  buttonText = 'Continuar',
  children,
}: AlertPopupProps) => (
  <Popup className="max-w-sm">
    <div className="text-special mb-2 flex justify-center">
      <Icon className="h-10 w-10" />
    </div>

    <h2 className="mb-2 text-center text-2xl font-bold">{title}</h2>
    <p className="my-6 text-center">{children}</p>

    <Button
      onClick={onClose}
      variant="special"
      className="my-3 w-full font-bold text-white transition-colors ease-in-out"
    >
      {buttonText}
    </Button>
  </Popup>
);
