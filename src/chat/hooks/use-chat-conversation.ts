import { UserSchema } from '@/user/schemas/user';
import { Session } from 'next-auth';
import { RefObject, useCallback, useEffect, useState } from 'react';
import { useChatForm } from '../hooks/use-chat-form';
import { useSupabase } from '../hooks/use-supabase';
import { ChatMessageSchema } from '../schemas/chat-message';

export interface UseChatConversationOptions {
  session: Session;
  messagesRef: RefObject<Element | null>;
  otherUser: UserSchema;
}

export const useChatConversation = ({
  session,
  messagesRef,
  otherUser,
}: UseChatConversationOptions) => {
  const { supabase } = useSupabase();
  const { form, handleSubmit } = useChatForm({
    recipientId: otherUser.id,
  });

  const [showReturn, setShowReturn] = useState(false);
  const [messages, setMessages] = useState<ChatMessageSchema[] | null>(null);

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
            .or(
              `and(from_id.eq."${otherUser.id}",to_id.eq."${session.user.id}"),and(from_id.eq."${session.user.id}",to_id.eq."${otherUser.id}")`,
            )
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
  }, [supabase, session.user.id, otherUser.id]);

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
  }, [messagesRef]);

  return { form, handleSubmit, showReturn, messages, scrollToBottom };
};
