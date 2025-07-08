'use client';

import { LeftBar } from '@/common/components/layout/LeftBar/LeftBar';
import { PopupProvider } from '@/common/components/providers/PopupProvider';
import { Inter } from 'next/font/google';
import { twJoin } from 'tailwind-merge';
import Error from './error';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
});

export interface Props {
  reset: () => void;
}

const GlobalError = ({ reset }: Readonly<Props>) => (
  <html lang="es" suppressHydrationWarning>
    <body
      className={twJoin(
        inter.className,
        'bg-background text-foreground font-main flex min-h-screen flex-col antialiased',
      )}
    >
      <div className="flex max-h-screen grow justify-items-stretch">
        <PopupProvider>
          <LeftBar session={null} />
          <Error reset={reset} />
        </PopupProvider>
      </div>
    </body>
  </html>
);

export default GlobalError;
