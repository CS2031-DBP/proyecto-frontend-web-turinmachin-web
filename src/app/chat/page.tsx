import { auth } from '@/auth';
import { ChatMainScreen } from '@/chat/components/ChatMainScreen';
import { Main } from '@/common/components/layout/Main';
import { Metadata } from 'next';
import { LuMessageSquare } from 'react-icons/lu';

export const metadata: Metadata = {
  title: 'Chat',
};

const ChatPage = async () => {
  const session = await auth();

  if (!session) {
    return (
      <Main className="text-foreground-muted flex grow flex-col items-center justify-center gap-y-2 px-4 py-6">
        <LuMessageSquare className="size-10" />
        <p className="font-medium">Inicia sesión para chatear.</p>
        <p className="text-sm">
          Necesitas iniciar sesión para usar esta función.
        </p>
      </Main>
    );
  }

  if (!session.user.verified || true) {
    <Main className="text-foreground-muted flex grow flex-col items-center justify-center gap-y-2 px-4 py-6">
      <LuMessageSquare className="size-10" />
      <p className="text-sm">¡Debes verificar tu cuenta para chatear!</p>
    </Main>;
  }

  return (
    <Main className="flex grow flex-col items-center px-4 py-6">
      <ChatMainScreen session={session} />
    </Main>
  );
};

export default ChatPage;
