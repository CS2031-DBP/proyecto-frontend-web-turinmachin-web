'use client';
import { UserSchema } from '@/user/schemas/user';
import { createContext } from 'react';

export type PopupType =
  | 'login'
  | 'register'
  | 'verification'
  | 'verificationResend'
  | 'verificationResendCooldown'
  | 'resetPassword'
  | 'resetPasswordConfirmation'
  | 'unverified'
  | 'noUniversity'
  | 'post'
  | 'deleteAccount'
  | 'modDeleteAccount'
  | 'deleteUniversity'
  | 'deleteDegree'
  | 'toxicityPost'
  | 'toxicityComment'
  | 'resetConversationAI'
  | 'googleUpgrade'
  | 'enableNotifications'
  | 'googleWelcome';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PopupArgs extends Record<PopupType, {}> {
  modDeleteAccount: {
    user: UserSchema;
  };
  deleteUniversity: {
    universityId: string;
  };
  deleteDegree: {
    degreeId: string;
  };
  resetConversationAI: {
    resetConversation: () => Promise<void>;
  };
  googleUpgrade: {
    idToken: string;
  };
  enableNotifications: {
    onGrant: () => Promise<void>;
  };
  googleWelcome: {
    username: string;
  };
}

export interface PopupContextValue {
  popup: PopupType | null;
  openPopup: <P extends PopupType>(popup: P, args: PopupArgs[P]) => void;
  closePopup: () => void;
}

export const PopupContext = createContext<PopupContextValue>({
  popup: null,
  openPopup: () => {
    throw new Error('openPopup not implemented');
  },
  closePopup: () => {
    throw new Error('closePopup not implemented');
  },
});
