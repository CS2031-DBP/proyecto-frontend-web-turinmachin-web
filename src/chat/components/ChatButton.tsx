'use client';
import { Button } from '@/common/components/Button';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import { LuMessageSquare } from 'react-icons/lu';
import { useSupabase } from '../hooks/use-supabase';

export interface Props {
  session: Session;
  onClick: () => void;
}

export const ChatButton = ({ session, onClick }: Props) => {
  const [alert, setAlert] = useState(false);
  const { supabase } = useSupabase();

  useEffect(() => {
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `to_id=eq.${session.user.id}`,
        },
        () => setAlert(true),
      )
      .subscribe();

    supabase
      .from('messages')
      .select('read')
      .eq('to_id', session.user.id)
      .eq('read', false)
      .limit(1)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setAlert(true);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, session.user.id]);

  return (
    <Button
      variant="special"
      className="fixed right-[clamp(1rem,2vw,2rem)] bottom-[clamp(1rem,2vw,2rem)] z-5 h-[clamp(3rem,4.5vw,4rem)] w-[clamp(3rem,4.5vw,4rem)] rounded-full p-0 shadow-lg"
      onClick={onClick}
    >
      {alert && (
        <div className="absolute -top-0.5 -left-0.5 size-4 rounded-full bg-red-500 shadow" />
      )}

      <div className="flex h-full w-full items-center justify-center">
        <LuMessageSquare className="h-1/2 w-1/2" />
      </div>
    </Button>
  );
};
