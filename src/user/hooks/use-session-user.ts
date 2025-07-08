import { useContext } from 'react';
import { SessionUserContext } from '../context/SessionUserContext';

export const useSessionUser = () => useContext(SessionUserContext);
