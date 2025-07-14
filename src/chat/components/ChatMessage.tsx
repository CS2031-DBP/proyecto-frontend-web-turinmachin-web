import { routes } from '@/common/util/routes';
import { ProfilePicture } from '@/user/components/ProfilePicture';
import { useSessionUser } from '@/user/hooks/use-session-user';
import { UserSchema } from '@/user/schemas/user';
import { Session } from 'next-auth';
import Link from 'next/link';
import { useEffect } from 'react';
import { twJoin } from 'tailwind-merge';
import { ChatMessageSchema } from '../schemas/chat-message';

export interface Props {
  session: Session;
  otherUser: UserSchema;
  message: ChatMessageSchema;
  prevMessage: ChatMessageSchema | null;
  scrollToBottom: () => void;
}

export const ChatMessage = ({
  session,
  otherUser,
  message,
  scrollToBottom,
}: Props) => {
  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  const { user } = useSessionUser();
  const isOwnMessage = message.from_id === session.user.id;
  const author = isOwnMessage ? session.user : otherUser;

  return (
    <li
      className={twJoin(
        'flex w-full max-w-2xl items-start gap-3 px-4 py-1',
        isOwnMessage ? 'flex-row-reverse text-right' : 'flex-row text-left',
      )}
    >
      <Link href={routes.users.byUsername(author.username)}>
        <ProfilePicture
          profilePicture={
            isOwnMessage ? user?.profilePicture : otherUser.profilePicture
          }
          className="size-8"
        />
      </Link>

      <div
        className={twJoin(
          'inline-block max-w-[80%] rounded px-4 py-2 text-sm',
          isOwnMessage
            ? 'bg-special text-background whitespace-pre-line'
            : 'bg-background-alt text-foreground',
        )}
      >
        {message.content}
      </div>
    </li>
  );
};
