import type { FallbackProps } from 'react-error-boundary';

export const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => (
  <div className="flex grow flex-col justify-center">
    <p className="mb-4 text-center text-3xl font-semibold">Algo salió mal :(</p>
    <div className="text-center">
      <button
        onClick={resetErrorBoundary}
        className="border-foreground cursor-pointer rounded-full border-2 px-3 py-1 text-lg font-semibold"
      >
        Reintentar
      </button>
    </div>
  </div>
);
