import { createServerApiClient } from '@/api/util/server';
import { auth } from '@/auth';
import { ChatConversationScreen } from '@/chat/components/ChatConversationScreen';
import { Main } from '@/common/components/layout/Main';
import { routes } from '@/common/util/routes';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Chat',
};

export interface Props {
  params: Promise<{ username: string }>;
}

const ChatWithUserPage = async ({ params }: Readonly<Props>) => {
  const { username } = await params;
  const session = await auth();

  if (!session || !session.user.verified) {
    return redirect(routes.chat.root);
  }

  const apiClient = createServerApiClient(session);
  const response = await apiClient.getUserByUsername({ params: { username } });

  if (response.status === 404) {
    return notFound();
  }

  const otherUser = response.body;

  return (
    <Main className="flex grow flex-col items-center px-4">
      <ChatConversationScreen session={session} otherUser={otherUser} />
    </Main>
  );
};

export default ChatWithUserPage;
