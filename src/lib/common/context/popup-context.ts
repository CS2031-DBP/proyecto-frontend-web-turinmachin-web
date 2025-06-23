'use client';

import { createContext } from 'react';

export type PopupType = 'login' | 'register' | 'verification' | 'post';

export interface PopupContextValue {
  popup: PopupType | null;
  openPopup: (popup: PopupType) => void;
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
