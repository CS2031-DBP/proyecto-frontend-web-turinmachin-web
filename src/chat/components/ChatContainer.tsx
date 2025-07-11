'use client';
import { Session } from 'next-auth';
import { useState } from 'react';
import { ChatButton } from './ChatButton';
import { ChatWindow } from './ChatWindow';

export interface Props {
  session: Session;
}

export const ChatContainer = ({ session }: Props) => {
  const [showChat, setShowChat] = useState(false);

  if (!showChat) {
    return <ChatButton session={session} onClick={() => setShowChat(true)} />;
  }

  return <ChatWindow session={session} onClose={() => setShowChat(false)} />;
};
