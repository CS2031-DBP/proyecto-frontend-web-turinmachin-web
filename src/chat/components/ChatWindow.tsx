'use client';
import { UserSchema } from '@/user/schemas/user';
import { Session } from 'next-auth';
import { useState } from 'react';
import { LuX } from 'react-icons/lu';
import { ChatConversation } from './ChatConversation';
import { ChatHome } from './ChatHome';
import { ChatSearcher } from './ChatSearcher';

export type ChatStatus = 'connecting' | 'loading' | 'connected';

export type ChatState =
  | { kind: 'home' }
  | { kind: 'search' }
  | { kind: 'chat'; user: UserSchema };

export interface Props {
  session: Session;
  onClose: () => void;
}

export const ChatWindow = ({ session, onClose }: Props) => {
  const [chatState, setChatState] = useState<ChatState>({ kind: 'home' });

  return (
    <div className="bg-background-alt fixed right-0 bottom-0 z-10 m-4 flex h-110 max-h-110 w-80 max-w-80 flex-col rounded-lg px-4 py-3">
      <button
        onClick={onClose}
        className="text-foreground-muted hover:text-foreground absolute top-0 right-0 m-3 flex"
      >
        <LuX className="inline size-5" />
      </button>
      {chatState.kind === 'home' ? (
        <ChatHome
          onUserSelect={(user) => setChatState({ kind: 'chat', user })}
        />
      ) : chatState.kind === 'search' ? (
        <ChatSearcher />
      ) : (
        <ChatConversation
          session={session}
          onGoBack={() => setChatState({ kind: 'home' })}
          otherUser={chatState.user}
        />
      )}
    </div>
  );
};
