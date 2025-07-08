'use client';

import { ButtonHTMLAttributes } from 'react';
import { LuTrash } from 'react-icons/lu';
import { useDeletePost } from '../hooks/use-delete-post';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  postId: string;
}

export const DeletePostButton = ({ postId }: Props) => {
  const { pending, deletePost } = useDeletePost(postId);

  return (
    <button onClick={deletePost} disabled={pending}>
      <LuTrash className="mr-2 inline" />
      Borrar
    </button>
  );
};
