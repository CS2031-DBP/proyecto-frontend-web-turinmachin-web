'use client';

import { DeleteAccountPopup } from '@/lib/auth/components/DeleteAccountPopup';
import { LoginPopup } from '@/lib/auth/components/LoginPopup';
import { RegisterPopup } from '@/lib/auth/components/RegisterPopup';
import { VerificationPopup } from '@/lib/auth/components/VerificationPopup';
import { ToxicityCommentPopup } from '@/lib/comment/components/ToxicityCommentPopup';
import { NoUniversityPopup } from '@/lib/post/components/NoUniversityPopup';
import { ToxicityPostPopup } from '@/lib/post/components/ToxicityPostPopup';
import { UnverifiedPopup } from '@/lib/post/components/UnverifiedPopup';
import { ModDeleteAccountPopup } from '@/lib/user/components/ModDeleteAccountPopup';
import { VerificationResendCooldownPopup } from '@/lib/user/components/VerificationResendCooldownPopup';
import { VerificationResendPopup } from '@/lib/user/components/VerificationResendPopup';
import { UnionToIntersection } from '@zodios/core/lib/utils.types';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { JSX } from 'react/jsx-runtime';
import { CreatePostPopup } from '../../../post/components/CreatePostPopup';
import {
  PopupArgs,
  PopupContext,
  PopupType,
} from '../../context/popup-context';

export interface Props {
  children?: ReactNode;
}

export type PopupProps<P extends PopupType> = (P extends keyof PopupArgs
  ? PopupArgs[P]
  : unknown) & {
  onClose: () => void;
};

export type PopupComponent<P extends PopupType> = (
  props: PopupProps<P>,
) => JSX.Element;

const PopupComponents: { [P in PopupType]: PopupComponent<P> } = {
  login: LoginPopup,
  register: RegisterPopup,
  post: CreatePostPopup,
  verification: VerificationPopup,
  verificationResend: VerificationResendPopup,
  verificationResendCooldown: VerificationResendCooldownPopup,
  unverified: UnverifiedPopup,
  noUniversity: NoUniversityPopup,
  deleteAccount: DeleteAccountPopup,
  modDeleteAccount: ModDeleteAccountPopup,
  toxicityPost: ToxicityPostPopup,
  toxicityComment: ToxicityCommentPopup,
};

export const PopupProvider = ({ children }: Props) => {
  const [popup, setPopup] = useState<PopupType | null>(null);
  const [args, setArgs] = useState<PopupArgs[keyof PopupArgs]>({});

  const openPopup = <P extends PopupType>(popup: P, args: PopupArgs[P]) => {
    setPopup(popup);
    if (args) {
      setArgs(args);
    }
  };
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
        createPortal(
          <CurrentPopup
            onClose={closePopup}
            {...(args as UnionToIntersection<PopupArgs[keyof PopupArgs]>)}
          />,
          document.body,
        )}
    </PopupContext>
  );
};
