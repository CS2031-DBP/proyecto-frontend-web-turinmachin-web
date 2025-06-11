import clsx from 'clsx';
import { type HTMLAttributes, type MouseEventHandler } from 'react';
import { useNavigate } from 'react-router';
import { FileCarousel } from '../../common/components/FileCarousel';
import { ResourceDetails } from '../../common/components/ResourceDetails';
import type { PostSchema } from '../schemas/post';
import { PostActionBar } from './PostActionBar';

export interface Props extends HTMLAttributes<HTMLLIElement> {
  post: PostSchema;
}

export const FeedPost = ({ post, className, ...props }: Props) => {
  const navigate = useNavigate();

  const postPath = `/posts/${post.id}`;

  const handleClick: MouseEventHandler = () => {
    navigate(postPath);
  };

  return (
    <li
      {...props}
      className={clsx(
        className,
        'border-muted block w-full cursor-pointer rounded-2xl border px-6 py-4',
      )}
      onClick={handleClick}
      role="button"
    >
      <ResourceDetails
        user={post.author}
        university={post.university}
        degree={post.degree}
        fromDate={post.createdAt}
      />
      <p className="mb-4 text-xl">{post.content}</p>
      {post.files.length !== 0 && (
        <FileCarousel files={post.files} linkTo={postPath} className="my-4" />
      )}
      <PostActionBar post={post} />
    </li>
  );
};
