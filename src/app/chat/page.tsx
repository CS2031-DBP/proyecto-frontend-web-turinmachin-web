import { auth } from '@/auth';
import { ChatMainScreen } from '@/chat/components/ChatMainScreen';
import { SupabaseProvider } from '@/chat/context/SupabaseProvider';
import { Main } from '@/common/components/layout/Main';
import { Metadata } from 'next';
import { LuMessageSquare } from 'react-icons/lu';

export const metadata: Metadata = {
  title: 'Chat',
};

const ChatPage = async () => {
  const session = await auth();

  return (
    <>
      {session?.user.verified ? (
        <SupabaseProvider session={session}>
          <Main className="flex grow flex-col items-center px-4 py-6">
            <ChatMainScreen session={session} />
          </Main>
        </SupabaseProvider>
      ) : (
        <Main className="flex grow flex-col items-center px-4 py-6">
          <div className="text-foreground-muted flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
            <LuMessageSquare className="h-8 w-8" />
            <p className="text-sm font-medium">Inicia sesión para chatear.</p>
            <p className="text-xs">
              Necesitas estar logueado para usar esta función.
            </p>
          </div>
        </Main>
      )}
    </>
  );
};

export default ChatPage;
