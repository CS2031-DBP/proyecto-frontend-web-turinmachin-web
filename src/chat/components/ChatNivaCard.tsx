'use client';

import { useRouter } from 'next/navigation';
import { LuBotMessageSquare } from 'react-icons/lu';

export const ChatNivaCard = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push('/chat/niva')}
      role="button"
      className="hover:bg-foreground/5 border-muted mb-4 flex cursor-pointer items-center gap-3 rounded border px-4 py-3"
    >
      <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full">
        <LuBotMessageSquare className="size-6" />
      </div>
      <div className="flex-1">
        <div className="font-semibold">Niva</div>
        <div className="text-foreground-muted text-sm">Tu asistente IA</div>
      </div>
    </div>
  );
};
