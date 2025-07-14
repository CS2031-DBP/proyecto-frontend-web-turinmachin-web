import { ApiClientProvider } from '@/api/context/ApiClientProvider';
import { auth } from '@/auth';
import { LeftBar } from '@/common/components/layout/LeftBar/LeftBar';
import { RightBar } from '@/common/components/layout/RightBar';
import { NotificationsProvider } from '@/common/components/NotificationsProvider';
import { PopupProvider } from '@/common/context/PopupProvider';
import { clientEnv } from '@/common/env/client';
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
                    <LeftBar session={session} />
                    {children}
                    <RightBar />
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
