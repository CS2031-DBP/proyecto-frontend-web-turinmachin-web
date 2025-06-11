import { createContext } from 'react';

export interface PostPopupContextValue {
  openPopup: () => void;
  closePopup: () => void;
}

export const PostPopupContext = createContext<PostPopupContextValue>({
  openPopup: () => {},
  closePopup: () => {},
});
