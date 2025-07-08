'use client';

import { usePopup } from '@/common/hooks/use-popup';
import { useSessionUser } from '@/user/hooks/use-session-user';
import { useEffect, useRef } from 'react';
import { LuMessageSquare, LuTrash } from 'react-icons/lu';
import { useAIConversation } from '../hooks/use-ai-conversation';
import { AIMessage } from './AIMessage';
import { AIMessageInput } from './AIMessageInput';

export const AIConversationScreen = () => {
  const { user } = useSessionUser();
  const notAllowed = !user || !user.verified;
  const { openPopup } = usePopup();
  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages, loading, sending, sendMessage, resetConversation } =
    useAIConversation({ enabled: !notAllowed });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, sending]);

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="flex w-full max-w-2xl items-center justify-between px-4 pb-4">
        <div className="text-foreground text-xl font-semibold">Niva AI</div>

        {!notAllowed && messages.length > 0 && (
          <button
            onClick={() =>
              openPopup('resetConversationAI', { resetConversation })
            }
            className="bg-background-alt text-foreground hover:bg-background rounded-md p-1.5 transition"
            title="Reiniciar conversación"
          >
            <LuTrash className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="flex w-full max-w-2xl flex-1 flex-col overflow-y-auto px-4 py-6">
        {notAllowed ? (
          <div className="text-foreground-muted flex flex-1 items-center justify-center px-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <LuMessageSquare className="h-8 w-8" />
              <p className="text-sm font-medium">
                {user
                  ? 'Verifica tu cuenta para usar Niva AI.'
                  : 'Inicia sesión para chatear con Niva AI.'}
              </p>
              <p className="text-xs">
                {user
                  ? 'Necesitas verificar tu cuenta.'
                  : 'Necesitas estar logueado para usar esta función.'}
              </p>
            </div>
          </div>
        ) : loading ? (
          <p className="text-muted">Cargando conversación...</p>
        ) : messages.length === 0 ? (
          <div className="text-foreground-muted flex flex-1 items-center justify-center px-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <LuMessageSquare className="h-8 w-8" />
              <p className="text-sm">Aún no has enviado ningún mensaje.</p>
              <p className="text-foreground-muted text-xs">
                Escribe algo para comenzar la conversación.
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <AIMessage key={message.id} message={message} />
            ))}

            {sending && (
              <div className="px-4 py-2 text-sm text-gray-500 italic">
                <span className="inline-block animate-bounce [animation-delay:0ms]">
                  .
                </span>
                <span className="inline-block animate-bounce [animation-delay:100ms]">
                  .
                </span>
                <span className="inline-block animate-bounce [animation-delay:200ms]">
                  .
                </span>
              </div>
            )}
          </>
        )}

        <div ref={bottomRef} />
      </div>

      <AIMessageInput onSend={sendMessage} disabled={sending || notAllowed} />
    </div>
  );
};
