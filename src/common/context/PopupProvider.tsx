'use client';
import { ResetConversationAIPopup } from '@/ai/components/popup/ResetConversationPopup';
import { DeleteAccountPopup } from '@/auth/components/popup/DeleteAccountPopup';
import { GoogleUpgradePopup } from '@/auth/components/popup/GoogleUpgradePopup';
import { GoogleWelcomePopup } from '@/auth/components/popup/GoogleWelcomePopup';
import { LoginPopup } from '@/auth/components/popup/LoginPopup';
import { RegisterPopup } from '@/auth/components/popup/RegisterPopup';
import { ResetPasswordConfirmationPopup } from '@/auth/components/popup/ResetPasswordConfirmationPopup';
import { ResetPasswordPopup } from '@/auth/components/popup/ResetPasswordPopup';
import { VerificationPopup } from '@/auth/components/popup/VerificationPopup';
import { EnableNotificationsPopup } from '@/chat/components/popup/EnableNotificationsPopup';
import { ToxicityCommentPopup } from '@/comment/components/popup/ToxicityCommentPopup';
import { UnionToIntersection } from '@/common/util/types';
import { DeleteDegreePopup } from '@/degree/components/popup/DeleteDegreePopup';
import { CreatePostPopup } from '@/post/components/popup/CreatePostPopup';
import { NoUniversityPopup } from '@/post/components/popup/NoUniversityPopup';
import { ToxicityPostPopup } from '@/post/components/popup/ToxicityPostPopup';
import { UnverifiedPopup } from '@/post/components/popup/UnverifiedPopup';
import { DeleteUniversityPopup } from '@/university/components/popup/DeleteUniversityPopup';
import { ModDeleteAccountPopup } from '@/user/components/popup/ModDeleteAccountPopup';
import { VerificationResendCooldownPopup } from '@/user/components/popup/VerificationResendCooldownPopup';
import { VerificationResendPopup } from '@/user/components/popup/VerificationResendPopup';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { JSX } from 'react/jsx-runtime';
import { PopupArgs, PopupContext, PopupType } from './PopupContext';

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
  enableNotifications: EnableNotificationsPopup,
  googleWelcome: GoogleWelcomePopup,
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
