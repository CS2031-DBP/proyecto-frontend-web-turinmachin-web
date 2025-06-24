import { routes } from '@/lib/routes';
import { Session } from 'next-auth';
import Link from 'next/link';
import { type HTMLAttributes } from 'react';
import { LuMessageCircle, LuShare2 } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';
import { CopyButton } from '../../common/components/CopyButton';
import { Dropdown } from '../../common/components/dropdown/Dropdown';
import { PostSchema } from '../schemas/post';
import { VoteButtons } from './VoteButtons';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  post: PostSchema;
  session: Session | null;
}

export const PostActionBar = ({
  post,
  session,
  className,
  ...props
}: Props) => (
  <div
    {...props}
    className={twMerge(
      'text-foreground-muted mt-2 flex flex-wrap items-stretch space-x-3 gap-y-4 font-semibold',
      className,
    )}
  >
    <VoteButtons
      postId={post.id}
      postScore={post.score}
      originalVote={post.currentVote}
      session={session}
    />
    <Link
      href={routes.posts.byId(post.id)}
      className="bg-background-alt hover:bg-alt hover:text-foreground flex items-center rounded-full px-4 py-2"
    >
      <LuMessageCircle size={20} />
      <span className="ml-2 not-md:hidden">{post.totalComments}</span>
    </Link>
    <Dropdown
      items={[
        <CopyButton
          key={0}
          text={`${process.env.NEXT_PUBLIC_DEPLOYMENT_URL}/posts/${post.id}`}
          label="Copiar link"
        />,
      ]}
      buttonProps={{
        className:
          'hover:text-foreground px-4 py-2 flex  items-center rounded-full bg-background-alt',
      }}
      className="flex"
    >
      <LuShare2 size={16} />
      <span className="ml-2 not-lg:hidden">Compartir</span>
    </Dropdown>
  </div>
);
