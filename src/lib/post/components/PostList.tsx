import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import type { PostSchema } from '../schemas/post';
import { FeedPost } from './FeedPost';

export interface Props extends HTMLAttributes<HTMLUListElement> {
  posts: PostSchema[];
  showSpinner?: boolean;
}

export const PostList = ({ posts, className, ...props }: Props) => (
  <ul {...props} className={clsx(className, 'mx-auto w-full max-w-lg')}>
    {posts.map((post) => (
      <FeedPost key={post.id} post={post} className="my-6" />
    ))}
  </ul>
);
