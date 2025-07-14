'use client';

import { ChatConversation } from '@/chat/components/ChatConversation';
import { UserSchema } from '@/user/schemas/user';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';

export interface Props {
  session: Session;
  otherUser: UserSchema;
}

export const ChatConversationScreen = ({ session, otherUser }: Props) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/chat');
  };

  return (
    <div className="flex h-screen w-full max-w-xl flex-col">
      <ChatConversation
        session={session}
        otherUser={otherUser}
        onGoBack={handleGoBack}
      />
    </div>
  );
};
