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
        className="fixed right-0 bottom-0 z-5 m-6 size-12 rounded-full"
        onClick={() => setShowChat(true)}
      >
        <LuMessageSquare className="absolute top-1/2 left-1/2 inline size-6 -translate-1/2" />
      </Button>
    );
  }

  return <ChatWindow session={session} onClose={() => setShowChat(false)} />;
};
