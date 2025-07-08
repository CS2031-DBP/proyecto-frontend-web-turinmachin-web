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
        'my-2 flex items-start gap-x-1.5',
        isOwnMessage && 'flex-row-reverse',
      )}
    >
      <Link href={routes.users.byUsername(author.username)}>
        <ProfilePicture
          profilePicture={
            isOwnMessage ? user?.profilePicture : otherUser.profilePicture
          }
          className="size-4"
        />
      </Link>

      <div>
        <div
          className={twJoin(
            'border-muted flex flex-wrap items-end space-x-2 rounded-md border px-3 py-1 text-sm',
            isOwnMessage && 'bg-muted',
          )}
        >
          {message.content}
        </div>
      </div>
    </li>
  );
};
