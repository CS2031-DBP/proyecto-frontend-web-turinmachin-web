'use client';
import { SupabaseClient } from '@supabase/supabase-js';
import { createContext } from 'react';
import { Database } from '../types/supabase';

export interface SupabaseContextValue {
  supabase: SupabaseClient<Database>;
}

export const SupabaseContext = createContext<SupabaseContextValue | null>(null);
