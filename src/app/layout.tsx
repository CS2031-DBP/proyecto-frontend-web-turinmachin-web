import { ApiClientProvider } from '@/api/context/ApiClientProvider';
import { auth } from '@/auth';
import { ChatButton } from '@/chat/components/ChatButton';
import { SupabaseProvider } from '@/chat/context/SupabaseProvider';
import { LeftBar } from '@/common/components/layout/LeftBar/LeftBar';
import { RightBar } from '@/common/components/layout/RightBar';
import { PopupProvider } from '@/common/components/providers/PopupProvider';
import { SessionUserProvider } from '@/user/components/SessionUserProvider';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { twJoin } from 'tailwind-merge';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'UniLife',
};

export interface Props {
  children?: ReactNode;
}

const RootLayout = async ({ children }: Readonly<Props>) => {
  const session = await auth();

  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={twJoin(
          inter.className,
          'bg-background textientforeground font-main flex min-h-screen flex-col antialiased',
        )}
      >
        <div className="flex max-h-screen grow justify-items-stretch">
          <SessionProvider>
            <ApiClientProvider session={session}>
              <SessionUserProvider session={session}>
                {session?.user.verified && (
                  <SupabaseProvider session={session}>
                    <ChatButton session={session} />
                  </SupabaseProvider>
                )}
                <PopupProvider>
                  <LeftBar session={session} />
                  {children}
                  <RightBar />
                </PopupProvider>
              </SessionUserProvider>
            </ApiClientProvider>
          </SessionProvider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
