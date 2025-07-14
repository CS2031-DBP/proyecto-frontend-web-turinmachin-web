'use client';

import { ChatHome } from '@/chat/components/ChatHome';
import { ChatNivaCard } from '@/chat/components/ChatNivaCard';
import { ChatSearcher } from '@/chat/components/ChatSearcher';
import { routes } from '@/common/util/routes';
import { UserSchema } from '@/user/schemas/user';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  session: Session;
}

export const ChatMainScreen = ({ session }: Props) => {
  const [view, setView] = useState<'home' | 'search'>('home');
  const router = useRouter();

  const handleUserSelect = (user: UserSchema) => {
    router.push(routes.chat.withUser(user.username));
  };

  const handleGoToSearch = () => setView('search');
  const handleGoBack = () => setView('home');

  return (
    <div className="flex h-full w-xl flex-col px-4 py-6">
      <p className="mb-2 text-xl font-semibold">Chat</p>
      <ChatNivaCard />
      {view === 'search' ? (
        <ChatSearcher onUserSelect={handleUserSelect} onGoBack={handleGoBack} />
      ) : (
        <ChatHome
          session={session}
          onUserSelect={handleUserSelect}
          goToSearch={handleGoToSearch}
        />
      )}
    </div>
  );
};
