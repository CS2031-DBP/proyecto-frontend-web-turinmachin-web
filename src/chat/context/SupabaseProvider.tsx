'use client';
import { clientEnv } from '@/common/env/client';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Session } from 'next-auth';
import { ReactNode, useRef } from 'react';
import { Database } from '../types/supabase';
import { SupabaseContext } from './SupabaseContext';

export interface Props {
  session: Session;
  children?: ReactNode;
}

export const SupabaseProvider = ({ session, children }: Props) => {
  const supabase = useRef<SupabaseClient<Database, 'public'>>(null);

  if (supabase.current === null) {
    supabase.current = createClient<Database>(
      clientEnv.NEXT_PUBLIC_SUPABASE_URL,
      clientEnv.NEXT_PUBLIC_SUPABASE_KEY,
      {
        auth: { persistSession: false },
        global: {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        },
      },
    );
  }

  return (
    <SupabaseContext value={{ supabase: supabase.current! }}>
      {children}
    </SupabaseContext>
  );
};
