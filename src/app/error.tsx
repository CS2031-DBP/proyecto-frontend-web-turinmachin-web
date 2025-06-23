'use client';

import { Button } from '@/lib/common/components/Button';

export interface Props {
  reset: () => void;
}

const Error = ({ reset }: Readonly<Props>) => (
  <div className="flex grow flex-col justify-center">
    <p className="mb-6 text-center text-3xl">Algo salió mal :(</p>
    <div className="text-center">
      <Button onClick={reset}>Reintentar</Button>
    </div>
  </div>
);

export default Error;
