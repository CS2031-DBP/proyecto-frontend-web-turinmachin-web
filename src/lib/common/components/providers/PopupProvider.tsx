'use client';

import { DeleteAccountPopup } from '@/lib/auth/components/DeleteAccountPopup';
import { LoginPopup } from '@/lib/auth/components/LoginPopup';
import { RegisterPopup } from '@/lib/auth/components/RegisterPopup';
import { VerificationPopup } from '@/lib/auth/components/VerificationPopup';
import { ToxicityCommentPopup } from '@/lib/comment/components/ToxicityCommentPopup';
import { ToxicityPostPopup } from '@/lib/post/components/ToxicityPostPopup';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { JSX } from 'react/jsx-runtime';
import { CreatePostPopup } from '../../../post/components/CreatePostPopup';
import { PopupContext, PopupType } from '../../context/popup-context';

export interface Props {
  children?: ReactNode;
}

export interface PopupProps {
  onClose: () => void;
}

export type PopupComponent = (props: PopupProps) => JSX.Element;

const PopupComponents: Record<PopupType, PopupComponent> = {
  login: LoginPopup,
  register: RegisterPopup,
  post: CreatePostPopup,
  verification: VerificationPopup,
  deleteAccount: DeleteAccountPopup,
  toxicityPost: ToxicityPostPopup,
  toxicityComment: ToxicityCommentPopup,
};

export const PopupProvider = ({ children }: Props) => {
  const [popup, setPopup] = useState<PopupType | null>(null);

  const openPopup = setPopup;
  const closePopup = () => setPopup(null);

  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        closePopup();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const CurrentPopup = popup === null ? null : PopupComponents[popup];

  return (
    <PopupContext value={{ popup, openPopup, closePopup }}>
      {children}
      {CurrentPopup &&
        createPortal(<CurrentPopup onClose={closePopup} />, document.body)}
    </PopupContext>
  );
};
