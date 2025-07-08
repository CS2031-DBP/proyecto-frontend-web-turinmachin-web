'use client';
import { AIMessageResponseSchema } from '@/ai/schemas/ai-message-response';
import NivaPicture from '@/assets/niva.png';
import { useSessionUser } from '@/user/hooks/use-session-user';
import Image from 'next/image';
import { LuUser } from 'react-icons/lu';
import ReactMarkdown from 'react-markdown';

interface Props {
  message: AIMessageResponseSchema;
}

export const AIMessage = ({ message }: Props) => {
  const { user } = useSessionUser();

  const isUser = message.role === 'USER';

  const avatar = isUser ? (
    user?.profilePicture ? (
      <div className="relative h-10 w-10 flex-shrink-0">
        <Image
          src={user.profilePicture.url}
          alt="Tu foto de perfil"
          fill
          sizes="40px"
          placeholder={user.profilePicture.blurDataUrl ? 'blur' : 'empty'}
          blurDataURL={user.profilePicture.blurDataUrl}
          className="rounded-full object-cover"
        />
      </div>
    ) : (
      <div className="bg-background-alt text-foreground-muted flex h-10 w-10 items-center justify-center rounded-full">
        <LuUser size={20} />
      </div>
    )
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
  );

  return (
    <div
      className={`flex w-full max-w-2xl items-start gap-3 px-4 py-2 ${
        isUser ? 'flex-row-reverse text-right' : 'flex-row text-left'
      }`}
    >
      {avatar}

      <div
        className={`inline-block max-w-[80%] rounded px-4 py-2 text-sm ${
          isUser
            ? 'bg-special text-background whitespace-pre-line'
            : 'bg-background-alt text-foreground'
        }`}
      >
        {isUser ? (
          <>{message.content}</>
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
