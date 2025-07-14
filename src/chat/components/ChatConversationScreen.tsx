'use client';
import { Button } from '@/common/components/Button';
import { Form } from '@/common/components/form/Form';
import { FormInput } from '@/common/components/form/FormInput';
import { Spinner } from '@/common/components/Spinner';
import { routes } from '@/common/util/routes';
import { ProfilePicture } from '@/user/components/ProfilePicture';
import { UserSchema } from '@/user/schemas/user';
import { Session } from 'next-auth';
import Link from 'next/link';
import { useRef } from 'react';
import {
  LuArrowDown,
  LuArrowLeft,
  LuMessagesSquare,
  LuSend,
} from 'react-icons/lu';
import { useChatConversation } from '../hooks/use-chat-conversation';
import { ChatMessage } from './ChatMessage';

import { useRouter } from 'next/navigation';
import { twJoin } from 'tailwind-merge';

export interface Props {
  session: Session;
  otherUser: UserSchema;
}

export const ChatConversationScreen = ({ session, otherUser }: Props) => {
  const router = useRouter();
  const messagesRef = useRef<HTMLDivElement>(null);
  const { form, handleSubmit, showReturn, messages, scrollToBottom } =
    useChatConversation({ messagesRef, otherUser, session });

  return (
    <div className="relative flex h-full w-full max-w-xl flex-col">
      <div className="mb-2 flex w-full items-center px-4 pt-4">
        <button
          className="hover:bg-foreground/5 text-foreground-muted mr-2 rounded-md px-1 py-1"
          onClick={() => router.push(routes.chat.root)}
        >
          <LuArrowLeft className="size-6" />
        </button>
        <Link
          href={routes.users.byUsername(otherUser.username)}
          className="hover:bg-foreground/5 flex grow items-center gap-x-2 rounded px-3 py-2"
        >
          <ProfilePicture
            profilePicture={otherUser.profilePicture}
            className="size-8"
          />
          <div>
            {otherUser.displayName ? (
              <>
                <div className="font-semibold">{otherUser.displayName}</div>
                <div className="text-foreground-muted text-sm">
                  @{otherUser.username}
                </div>
              </>
            ) : (
              otherUser.username
            )}
          </div>
        </Link>
      </div>

      <div
        className="border-muted grow overflow-y-auto rounded border py-2 not-sm:px-0 sm:px-4"
        ref={messagesRef}
      >
        {!messages ? (
          <div className="flex h-full grow items-center justify-center gap-2">
            <Spinner className="size-8 border-4" />
            <p className="text-foreground-muted">Cargando mensajes...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-foreground-muted flex h-full flex-col items-center justify-center gap-y-2">
            <LuMessagesSquare className="size-8" />
            <div>¡Escribe algo!</div>
          </div>
        ) : (
          <ul>
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                session={session}
                message={message}
                otherUser={otherUser}
                prevMessage={messages[index - 1] ?? null}
                scrollToBottom={scrollToBottom}
              />
            ))}
          </ul>
        )}

        <button
          type="button"
          onClick={scrollToBottom}
          className={twJoin(
            'bg-muted absolute left-1/2 z-10 -translate-x-1/2 rounded-full p-2 transition-[bottom] hover:brightness-90',
            showReturn ? 'bottom-16' : 'bottom-0',
          )}
        >
          <LuArrowDown className="size-5" />
        </button>
      </div>

      <Form
        form={form}
        onSubmit={handleSubmit}
        className="bg-background z-20 flex items-stretch gap-2 pt-2"
      >
        <FormInput
          form={form}
          name="content"
          placeholder="Escribe algo..."
          labelProps={{ className: 'my-0 grow' }}
          autoComplete="off"
          disabled={messages === null}
          showError={false}
        />
        <Button className="px-3 py-1" disabled={messages === null}>
          <LuSend />
        </Button>
      </Form>
    </div>
  );
};
