import { DivLink } from '@/common/components/DivLink';
import { routes } from '@/common/util/routes';
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

export const PostCard = ({ post, session, className, ...props }: Props) => (
  <li {...props}>
    <DivLink
      className={twMerge(
        'border-muted hover:border-special block w-full rounded-2xl border px-6 py-4 not-sm:px-4 not-sm:py-2.5',
        className,
      )}
      href={routes.posts.byId(post.id)}
    >
      <ResourceDetails
        user={post.author}
        university={post.university}
        degree={post.degree}
        fromDate={post.createdAt}
        className="mb-3"
      />
      <p className="mb-4 text-xl break-words">{post.content}</p>
      {post.files.length !== 0 && (
        <FileCarousel
          files={post.files}
          linkTo={routes.posts.byId(post.id)}
          className="my-4"
        />
      )}
      <PostActionBar post={post} session={session} />
    </DivLink>
  </li>
);
