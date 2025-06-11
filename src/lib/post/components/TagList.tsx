import { clsx } from 'clsx';
import type { HTMLAttributes } from 'react';
import { NavLink } from 'react-router';

export interface Props extends HTMLAttributes<HTMLUListElement> {
  tags: string[];
}

export const TagList = ({ tags, className, ...props }: Props) => (
  <ul {...props} className={clsx(className, 'mt-2 mb-4 flex space-x-2')}>
    {tags.map((tag) => (
      <li key={tag} className="bg-background-alt rounded-full text-sm">
        <NavLink
          to={`/posts?tags=${tag}`}
          className="block px-3 py-1 hover:underline"
        >
          #{tag}
        </NavLink>
      </li>
    ))}
  </ul>
);
