import { DivLink } from '@/lib/common/components/DivLink';
import { routes } from '@/lib/routes';
import { Session } from 'next-auth';
import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { FileCarousel } from '../../common/components/FileCarousel';
import { ResourceDetails } from '../../common/components/ResourceDetails';
import { PostSchema } from '../schemas/post';
import { PostActionBar } from './PostActionBar';

export interface Props extends HTMLAttributes<HTMLLIElement> {
  post: PostSchema;
  session: Session | null;
}

export const FeedPost = ({ post, session, className, ...props }: Props) => (
  <li {...props}>
    <DivLink
      className={twMerge(
        'border-muted block w-full rounded-2xl border px-6 py-4',
        className,
      )}
      href={routes.posts.byId(post)}
    >
      <ResourceDetails
        user={post.author}
        university={post.university}
        degree={post.degree}
        fromDate={post.createdAt}
        className="mb-3"
      />
      <p className="mb-4 text-xl">{post.content}</p>
      {post.files.length !== 0 && (
        <FileCarousel
          files={post.files}
          linkTo={routes.posts.byId(post)}
          className="my-4"
        />
      )}
      <PostActionBar post={post} session={session} />
    </DivLink>
  </li>
);
