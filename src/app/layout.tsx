import { ApiClientProvider } from '@/lib/api/context/ApiClientProvider';
import { auth } from '@/lib/auth';
// import { Chat } from '@/lib/chat/components/Chat';
import { LeftBar } from '@/lib/common/components/layout/LeftBar/LeftBar';
import { PopupProvider } from '@/lib/common/components/providers/PopupProvider';
import { SessionUserProvider } from '@/lib/user/components/SessionUserProvider';
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
                <PopupProvider>
                  {/* {session && <Chat session={session} />} */}
                  <LeftBar session={session} />
                  {children}
                  {/* <RightBar universities={universities} degrees={degrees} /> */}
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
