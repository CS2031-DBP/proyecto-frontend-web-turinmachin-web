import { useContext } from 'react';
import { PostPopupContext } from '../context/post-popup-context';

export const usePostPopup = () => useContext(PostPopupContext);
