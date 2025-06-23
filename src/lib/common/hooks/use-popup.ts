import { useContext } from 'react';
import { PopupContext } from '../context/popup-context';

export const usePopup = () => useContext(PopupContext);
