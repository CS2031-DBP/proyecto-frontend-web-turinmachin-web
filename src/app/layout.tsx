import { ApiClientProvider } from '@/lib/api/context/ApiClientProvider';
import { createServerApiClient } from '@/lib/api/util/client';
import { auth } from '@/lib/auth';
import { LeftBar } from '@/lib/common/components/layout/LeftBar/LeftBar';
import { RightBar } from '@/lib/common/components/layout/RightBar';
import { PopupProvider } from '@/lib/common/components/providers/PopupProvider';
import { UserProvider } from '@/lib/user/components/UserProvider';
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
  const apiClient = createServerApiClient(session);

  const universities = await apiClient.getUniversities();
  const degrees = await apiClient.getDegrees();

  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={twJoin(
          inter.className,
          'bg-background text-foreground font-main flex min-h-screen flex-col antialiased',
        )}
      >
        <div className="flex max-h-screen grow justify-items-stretch">
          <SessionProvider>
            <ApiClientProvider session={session}>
              <UserProvider session={session}>
                <PopupProvider>
                  <LeftBar session={session} />
                  {children}
                  <RightBar universities={universities} degrees={degrees} />
                </PopupProvider>
              </UserProvider>
            </ApiClientProvider>
          </SessionProvider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
