'use client';
import { Button } from '@/lib/common/components/Button';
import { Form } from '@/lib/common/components/form/Form';
import { FormInput } from '@/lib/common/components/form/FormInput';
import { Spinner } from '@/lib/common/components/Spinner';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Session } from 'next-auth';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LuArrowDown, LuSend } from 'react-icons/lu';
import { twJoin } from 'tailwind-merge';
import { useChatForm } from '../hooks/use-chat-form';
import { ChatMessageSchema } from '../schemas/chat-message';
import { DeletedChatMessageSchema } from '../schemas/deleted-chat-message';
import { Database } from '../types/supabase';

export type ChatStatus = 'connecting' | 'loading' | 'connected';

export interface Props {
  session: Session;
  pageSize: number;
}

export const Chat = ({ session, pageSize = 5 }: Props) => {
  const [showReturn, setShowReturn] = useState(false);
  const [, setMessages] = useState<ChatMessageSchema[]>([]);
  const [status, setStatus] = useState<ChatStatus>('connecting');
  const messagesRef = useRef<HTMLUListElement>(null);
  const supabase = useRef<SupabaseClient<Database, 'public'>>(null);

  const { form, handleSubmit } = useChatForm();

  if (supabase.current === null) {
    supabase.current = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: { persistSession: false },
        global: {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        },
      },
    );
  }

  const handleMessageCreate = (message: ChatMessageSchema) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleMessageDelete = useCallback(
    (message: DeletedChatMessageSchema) => {
      setMessages((prevMessages) => {
        const index = prevMessages.findLastIndex((m) => m.id === message.id);
        if (index === -1) return prevMessages;

        const newMessages = [...prevMessages];
        if (newMessages[index].author_id !== session.user.id) {
          newMessages.splice(index, 1);
        } else {
          // newMessages[index].deleted = true;
        }
        return newMessages;
      });
    },
    [session.user.id],
  );

  useEffect(() => {
    if (!session || !supabase.current) return;

    const channel = supabase.current
      .channel('messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          const message = ChatMessageSchema.parse(payload.new);
          handleMessageCreate(message);
        },
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'messages' },
        (payload) => {
          const deletedMessage = DeletedChatMessageSchema.parse(payload.old);
          handleMessageDelete(deletedMessage);
        },
      )
      .subscribe(async () => {
        if (!supabase.current) return;
        setStatus('loading');

        const res = await supabase.current
          .from('messages')
          .select()
          .order('created_at', { ascending: false })
          .limit(pageSize);

        if (res.data) {
          setMessages(
            res.data.toReversed().map((m) => ChatMessageSchema.parse(m)),
          );
        }
        setStatus('connected');
      });

    return () => {
      supabase.current?.removeChannel(channel);
    };
  }, [session, pageSize, handleMessageDelete]);

  const scrollToBottom = useCallback(() => {
    const messages = messagesRef.current;
    if (!messages) return;

    if (messages.scrollTop + messages.clientHeight >= messages.scrollHeight) {
      messages.scrollTop = messages.scrollHeight;
    }
  }, [messagesRef]);

  // const fetchOlderMessages = async () => {
  //   if (!supabase.current) return;
  //
  //   const res = await supabase.current
  //     .from('messages')
  //     .select()
  //     .lt('created_at', messages[0].created_at.toISOString())
  //     .order('created_at', { ascending: false })
  //     .limit(pageSize);
  //
  //   if (res.data) {
  //     const parsedMessages = res.data.map((m) => ChatMessageSchema.parse(m));
  //     setMessages((prevMessages) => [
  //       ...parsedMessages.toReversed(),
  //       ...prevMessages,
  //     ]);
  //   }
  // };

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
    <div className="bg-background-alt fixed right-0 bottom-0 z-10 m-4 w-80 max-w-80 rounded-lg px-3 py-2">
      <p className="mb-2 text-xl font-semibold">Chat</p>
      <ul
        className="border-muted h-100 overflow-y-auto rounded-lg border px-2"
        ref={messagesRef}
      >
        {status !== 'connected' ? (
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <Spinner className="size-8 border-4" />
            <p className="text-foreground-muted">
              {status === 'connecting'
                ? 'Conectando...'
                : 'Cargando mensajes...'}
            </p>
          </div>
        ) : (
          <>
            <div className="my-4 flex justify-center">
              <Spinner className="size-6 border-3" />
            </div>
            {/* {messages.map((message, index) => ( */}
            {/*   <MessageItem */}
            {/*     key={message.id} */}
            {/*     message={message} */}
            {/*     prevMessage={messages[index - 1] ?? null} */}
            {/*     scrollToBottom={scrollToBottom} */}
            {/*   /> */}
            {/* ))} */}
          </>
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
            disabled={status !== 'connected'}
          />
          <Button className="px-3 py-1" disabled={status !== 'connected'}>
            <LuSend className="inline" />
          </Button>
        </Form>
      </div>
    </div>
  );
};
