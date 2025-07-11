'use client';

import { Button } from '@/common/components/Button';
import { Session } from 'next-auth';
import { useState } from 'react';
import { LuMessageSquare } from 'react-icons/lu';
import { ChatWindow } from './ChatWindow';

export interface Props {
  session: Session;
}

export const ChatContainer = ({ session }: Props) => {
  const [showChat, setShowChat] = useState(false);

  if (!showChat) {
    return (
      <Button
        variant="special"
        className="fixed right-[clamp(1rem,2vw,2rem)] bottom-[clamp(1rem,2vw,2rem)] z-5 h-[clamp(3rem,4.5vw,4rem)] w-[clamp(3rem,4.5vw,4rem)] rounded-full p-0 shadow-lg"
        onClick={() => setShowChat(true)}
      >
        <div className="flex h-full w-full items-center justify-center">
          <LuMessageSquare className="h-1/2 w-1/2" />
        </div>
      </Button>
    );
  }

  return <ChatWindow session={session} onClose={() => setShowChat(false)} />;
};
