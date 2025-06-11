import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense, useRef, type ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ScrollRestorer } from '../behavior/ScrollRestorer';
import { ErrorFallback } from '../pages/ErrorFallback';
import { LoadingScreen } from '../pages/LoadingScreen';
import { LeftBar } from './LeftBar';
import { RightBar } from './RightBar';

export interface Props {
  children?: ReactNode;
}

export const Layout = ({ children }: Props) => {
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex max-h-screen grow justify-items-stretch">
      <ScrollRestorer ref={mainRef} />
      <LeftBar className="w-58 min-w-58 lg:w-72 lg:min-w-72" />
      <main
        tabIndex={0}
        role="main"
        autoFocus
        ref={mainRef}
        className="border-muted flex grow flex-col overflow-y-scroll border-x px-8 py-6"
      >
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset} fallbackRender={ErrorFallback}>
              <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </main>
      <RightBar className="w-46 min-w-46 lg:w-68 lg:min-w-68" />
    </div>
  );
};
