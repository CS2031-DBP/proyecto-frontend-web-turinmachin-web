'use client';

import { ResetConversationAIPopup } from '@/ai/components/ResetConversationPopup';
import { DeleteAccountPopup } from '@/auth/components/DeleteAccountPopup';
import { GoogleUpgradePopup } from '@/auth/components/GoogleUpgradePopup';
import { LoginPopup } from '@/auth/components/LoginPopup';
import { RegisterPopup } from '@/auth/components/RegisterPopup';
import { ResetPasswordConfirmationPopup } from '@/auth/components/ResetPasswordConfirmationPopup';
import { ResetPasswordPopup } from '@/auth/components/ResetPasswordPopup';
import { VerificationPopup } from '@/auth/components/VerificationPopup';
import { ToxicityCommentPopup } from '@/comment/components/ToxicityCommentPopup';
import { UnionToIntersection } from '@/common/util/types';
import { DeleteDegreePopup } from '@/degree/components/DeleteDegreePopup';
import { NoUniversityPopup } from '@/post/components/NoUniversityPopup';
import { ToxicityPostPopup } from '@/post/components/ToxicityPostPopup';
import { UnverifiedPopup } from '@/post/components/UnverifiedPopup';
import { DeleteUniversityPopup } from '@/university/components/DeleteUniversityPopup';
import { ModDeleteAccountPopup } from '@/user/components/ModDeleteAccountPopup';
import { VerificationResendCooldownPopup } from '@/user/components/VerificationResendCooldownPopup';
import { VerificationResendPopup } from '@/user/components/VerificationResendPopup';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { JSX } from 'react/jsx-runtime';
import { CreatePostPopup } from '../../../post/components/CreatePostPopup';
import { PopupArgs, PopupContext, PopupType } from '../../context/PopupContext';

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
  resetPassword: ResetPasswordPopup,
  resetPasswordConfirmation: ResetPasswordConfirmationPopup,
  unverified: UnverifiedPopup,
  noUniversity: NoUniversityPopup,
  deleteAccount: DeleteAccountPopup,
  modDeleteAccount: ModDeleteAccountPopup,
  deleteUniversity: DeleteUniversityPopup,
  deleteDegree: DeleteDegreePopup,
  toxicityPost: ToxicityPostPopup,
  toxicityComment: ToxicityCommentPopup,
  resetConversationAI: ResetConversationAIPopup,
  googleUpgrade: GoogleUpgradePopup,
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
