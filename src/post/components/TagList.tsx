import { routes } from '@/common/util/routes';
import Link from 'next/link';
import type { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface Props extends HTMLAttributes<HTMLUListElement> {
  tags: string[];
}

export const TagList = ({ tags, className, ...props }: Props) => (
  <ul {...props} className={twMerge(className, 'flex space-x-2')}>
    {tags.map((tag) => (
      <li key={tag} className="bg-background-alt rounded-full text-sm">
        <Link
          href={`${routes.posts.root}?tags=${tag}`}
          className="block px-3 py-1 hover:underline"
        >
          #{tag}
        </Link>
      </li>
    ))}
  </ul>
);
