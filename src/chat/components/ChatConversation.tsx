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
import { twJoin } from 'tailwind-merge';
import { useChatConversation } from '../hooks/use-chat-conversation';
import { ChatMessage } from './ChatMessage';

export interface Props {
  session: Session;
  otherUser: UserSchema;
  onGoBack: () => void;
}

export const ChatConversation = ({ session, otherUser, onGoBack }: Props) => {
  const messagesRef = useRef<HTMLUListElement>(null);
  const { form, handleSubmit, showReturn, messages, scrollToBottom } =
    useChatConversation({ messagesRef, otherUser, session });

  return (
    <>
      <div className="mb-2 flex w-full items-center">
        <button
          className="hover:bg-foreground/5 text-foreground-muted mr-2 block rounded-md px-1 py-1"
          onClick={onGoBack}
        >
          <LuArrowLeft className="inline size-6" />
        </button>
        <Link
          href={routes.users.byUsername(otherUser.username)}
          className="hover:bg-foreground/5 flex cursor-pointer items-center gap-x-2 rounded px-3 py-2"
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
      <ul
        className="border-muted h-100 overflow-y-auto rounded-lg border px-2"
        ref={messagesRef}
      >
        {!messages ? (
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <Spinner className="size-8 border-4" />
            <p className="text-foreground-muted">Cargando mensajes...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-foreground-muted flex h-full flex-col items-center justify-center gap-y-2">
            <LuMessagesSquare className="size-8" />
            <div>¡Escribe algo!</div>
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              session={session}
              message={message}
              otherUser={otherUser}
              prevMessage={messages[index - 1] ?? null}
              scrollToBottom={scrollToBottom}
            />
          ))
        )}
      </ul>
      <div className="relative z-20">
        <button
          type="button"
          onClick={scrollToBottom}
          className={twJoin(
            'bg-muted absolute left-1/2 z-15 size-8 -translate-x-1/2 rounded-full transition-all hover:brightness-80',
            showReturn ? '-top-12' : 'top-0',
          )}
        >
          <LuArrowDown className="inline" />
        </button>
        <Form
          form={form}
          onSubmit={handleSubmit}
          className="bg-background-alt relative z-20 flex gap-x-3 py-4"
        >
          <FormInput
            form={form}
            name="content"
            placeholder="Escribe algo..."
            labelProps={{ className: 'my-0 grow' }}
            autoComplete="off"
            disabled={messages === null}
          />
          <Button className="px-3 py-1" disabled={messages === null}>
            <LuSend className="inline" />
          </Button>
        </Form>
      </div>
    </>
  );
};
