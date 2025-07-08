import { useContext } from 'react';
import { SessionUserContext } from '../components/SessionUserContext';

export const useSessionUser = () => useContext(SessionUserContext);
