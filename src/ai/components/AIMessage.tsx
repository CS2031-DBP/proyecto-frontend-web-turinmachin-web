'use client';
import { AIMessageResponseSchema } from '@/ai/schemas/ai-message-response';
import NivaPicture from '@/assets/niva.png';
import { ProfilePicture } from '@/user/components/ProfilePicture';
import { useSessionUser } from '@/user/hooks/use-session-user';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { twJoin } from 'tailwind-merge';

interface Props {
  message: AIMessageResponseSchema;
}

export const AIMessage = ({ message }: Props) => {
  const { user } = useSessionUser();

  const isAuthorSelf = message.role === 'USER';

  return (
    <div
      className={twJoin(
        'flex w-full max-w-2xl items-start gap-3 px-4 py-2',
        isAuthorSelf ? 'flex-row-reverse text-right' : 'flex-row text-left',
      )}
    >
      {isAuthorSelf ? (
        <ProfilePicture profilePicture={user?.profilePicture} />
      ) : (
        <div className="relative h-10 w-10 flex-shrink-0">
          <Image
            src={NivaPicture}
            alt="Niva"
            fill
            sizes="40px"
            className="rounded-full object-cover"
          />
        </div>
      )}
      <div
        className={twJoin(
          'inline-block max-w-[80%] rounded px-4 py-2 text-sm',
          isAuthorSelf
            ? 'bg-special text-background whitespace-pre-line'
            : 'bg-background-alt text-foreground',
        )}
      >
        {isAuthorSelf ? (
          message.content
        ) : (
          <ReactMarkdown
            components={{
              strong: ({ children }) => (
                <strong className="font-semibold">{children}</strong>
              ),
              em: ({ children }) => <em className="italic">{children}</em>,
              ul: ({ children }) => (
                <ul className="my-2 list-disc pl-5">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="my-2 list-decimal pl-5">{children}</ol>
              ),
              li: ({ children }) => <li className="mb-1">{children}</li>,
              p: ({ children }) => <p className="mb-2">{children}</p>,
            }}
          >
            {message.content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};
