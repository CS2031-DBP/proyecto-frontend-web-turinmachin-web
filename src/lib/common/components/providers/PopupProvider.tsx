'use client';

import { LoginPopup } from '@/lib/auth/components/LoginPopup';
import { RegisterPopup } from '@/lib/auth/components/RegisterPopup';
import { VerificationPopup } from '@/lib/auth/components/VerificationPopup';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CreatePostPopup } from '../../../post/components/CreatePostPopup';
import { PopupContext, PopupType } from '../../context/popup-context';

export interface Props {
  children?: ReactNode;
}

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

  return (
    <PopupContext value={{ popup, openPopup, closePopup }}>
      {children}
      {popup !== null &&
        createPortal(
          popup === 'post' ? (
            <CreatePostPopup />
          ) : popup === 'login' ? (
            <LoginPopup />
          ) : popup === 'register' ? (
            <RegisterPopup />
          ) : (
            <VerificationPopup onClose={closePopup} />
          ),
          document.body,
        )}
    </PopupContext>
  );
};
