import { ApiClientProvider } from '@/api/context/ApiClientProvider';
import { auth } from '@/auth';
import { SupabaseProvider } from '@/chat/context/SupabaseProvider';
import { BottomNavigation } from '@/common/components/layout/BottomNavigation';
import { FloatingLoginButton } from '@/common/components/layout/FloatingLoginButton';
import { LeftBar } from '@/common/components/layout/LeftBar/LeftBar';
import { RightBar } from '@/common/components/layout/RightBar';
import { NotificationsProvider } from '@/common/components/NotificationsProvider';
import { PopupProvider } from '@/common/context/PopupProvider';
import { clientEnv } from '@/common/env/client';
import { FloatingPostButton } from '@/post/components/FloatingPostButton';
import { SessionUserProvider } from '@/user/context/SessionUserProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
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
  description: 'La plataforma social que une universidades.',
};

export interface Props {
  children?: ReactNode;
}

const RootLayout = async ({ children }: Readonly<Props>) => {
  const session = await auth();

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/favicon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body className={twJoin(inter.className)}>
        <div className="flex h-full justify-items-stretch">
          <SessionProvider>
            <ApiClientProvider session={session}>
              <SessionUserProvider session={session}>
                <GoogleOAuthProvider
                  clientId={clientEnv.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                >
                  <PopupProvider>
                    {session?.user.verified && <NotificationsProvider />}
                    <div className="flex h-screen w-full">
                      <div className="hidden sm:flex">
                        <LeftBar session={session} />
                      </div>
                      <SupabaseProvider session={session}>
                        {children}
                      </SupabaseProvider>
                      <div className="hidden xl:flex">
                        <RightBar />
                      </div>
                    </div>
                    {session ? (
                      <FloatingPostButton session={session} />
                    ) : (
                      <FloatingLoginButton />
                    )}
                    <BottomNavigation session={session} />
                  </PopupProvider>
                </GoogleOAuthProvider>
              </SessionUserProvider>
            </ApiClientProvider>
          </SessionProvider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
