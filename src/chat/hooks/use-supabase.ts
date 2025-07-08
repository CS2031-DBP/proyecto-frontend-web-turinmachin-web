import { useContext } from 'react';
import { SupabaseContext } from '../context/SupabaseContext';

export const useSupabase = () => {
  const value = useContext(SupabaseContext);
  if (value === null) throw new Error('SupabaseContext is not initialized');

  return value;
};
