import { routes } from '@/common/util/routes';
import { useUser } from '@/user/hooks/use-user';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { LuUser } from 'react-icons/lu';
import { twJoin } from 'tailwind-merge';
import { ChatMessageSchema } from '../schemas/chat-message';

export interface Props {
  message: ChatMessageSchema;
  prevMessage: ChatMessageSchema | null;
  scrollToBottom: () => void;
}

export const MessageItem = ({
  message,
  prevMessage,
  scrollToBottom,
}: Props) => {
  const { user } = useUser(message.author_id);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom, message.deleted]);

  return (
    <li className="my-2 flex items-start">
      {user && (
        <Link href={routes.users.byUsername(user.username)}>
          <div className="bg-muted relative mr-1.5 size-4 min-w-4 overflow-hidden rounded-full">
            {user.profilePicture ? (
              message.author_id !== prevMessage?.author_id && (
                <Image
                  src={user.profilePicture.url}
                  alt=""
                  fill
                  sizes="5vw"
                  className="object-cover"
                />
              )
            ) : (
              <LuUser className="text-foreground-muted absolute top-1/2 left-1/2 inline size-3 -translate-1/2" />
            )}
          </div>
        </Link>
      )}
      <div>
        <div
          className={twJoin(
            'flex flex-wrap items-end space-x-2 rounded-md border px-3 py-1 text-sm',
            !message.deleted ? 'border-muted' : 'text-error/80 border-error/50',
          )}
        >
          {message.content}
        </div>
        {message.deleted && (
          <div className="text-error pt-1 text-xs">
            Borrado por inapropiado.
          </div>
        )}
      </div>
    </li>
  );
};
