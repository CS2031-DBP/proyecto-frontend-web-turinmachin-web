import { Button } from '@/common/components/Button';
import { Form } from '@/common/components/form/Form';
import { FormInput } from '@/common/components/form/FormInput';
import { Spinner } from '@/common/components/Spinner';
import { ProfilePicture } from '@/user/components/ProfilePicture';
import { UserSchema } from '@/user/schemas/user';
import { Session } from 'next-auth';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LuArrowDown, LuArrowLeft, LuFeather, LuSend } from 'react-icons/lu';
import { twJoin } from 'tailwind-merge';
import { useChatForm } from '../hooks/use-chat-form';
import { useSupabase } from '../hooks/use-supabase';
import { ChatMessageSchema } from '../schemas/chat-message';
import { ChatMessage } from './ChatMessage';

export interface Props {
  session: Session;
  otherUser: UserSchema;
  onGoBack: () => void;
}

export const ChatConversation = ({ session, otherUser, onGoBack }: Props) => {
  const { supabase } = useSupabase();
  const { form, handleSubmit } = useChatForm({
    recipientId: otherUser.id,
  });

  const [showReturn, setShowReturn] = useState(false);
  const [messages, setMessages] = useState<ChatMessageSchema[] | null>(null);
  const messagesRef = useRef<HTMLUListElement>(null);

  const handleMessageCreate = (message: ChatMessageSchema) => {
    setMessages((prevMessages) =>
      prevMessages ? [...prevMessages, message] : null,
    );
  };

  const scrollToBottom = useCallback(() => {
    const messages = messagesRef.current;
    if (!messages) return;

    messages.scrollTop = messages.scrollHeight - messages.clientHeight;
  }, [messagesRef]);

  const chatFilter = `and(from_id.eq."${otherUser.id}",to_id.eq."${session.user.id}"),and(from_id.eq."${session.user.id}",to_id.eq."${otherUser.id}")`;

  useEffect(() => {
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          const message = ChatMessageSchema.parse(payload.new);
          if (
            (message.from_id === otherUser.id &&
              message.to_id === session.user.id) ||
            (message.from_id === session.user.id &&
              message.to_id === otherUser.id)
          ) {
            handleMessageCreate(message);
          }
        },
      )
      .subscribe(async () => {
        if (!supabase) return;

        try {
          const res = await supabase
            .from('messages')
            .select()
            .or(chatFilter)
            .order('created_at', { ascending: false });

          if (res.data) {
            setMessages(
              res.data.toReversed().map((m) => ChatMessageSchema.parse(m)),
            );
          }
        } catch (err) {
          console.error(err);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, chatFilter, session.user.id, otherUser.id]);

  useEffect(() => {
    const messages = messagesRef.current;
    if (!messages) return;

    const handleScroll = () => {
      setShowReturn(
        messages.scrollHeight - messages.scrollTop - messages.clientHeight >=
          300,
      );
    };

    messages.addEventListener('scroll', handleScroll);
    return () => {
      messages.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="mb-2 flex w-full items-center gap-x-2">
        <button
          className="hover:bg-foreground/5 text-foreground-muted block rounded-md px-1 py-1"
          onClick={onGoBack}
        >
          <LuArrowLeft className="inline size-6" />
        </button>
        <ProfilePicture
          profilePicture={otherUser.profilePicture}
          className="size-10"
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
            <LuFeather className="size-8" />
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
