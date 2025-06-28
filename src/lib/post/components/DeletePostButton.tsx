'use client';

import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { routes } from '@/lib/routes';
import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes } from 'react';
import { LuTrash } from 'react-icons/lu';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  postId: string;
}

export const DeletePostButton = ({ postId }: Props) => {
  const router = useRouter();
  const { apiClient } = useApiClient();

  const handleClick = async () => {
    await apiClient.deletePost(undefined, {
      params: { id: postId },
    });
    router.push(routes.home);
  };

  return (
    <button onClick={handleClick}>
      <LuTrash className="mr-2 inline" /> Borrar
    </button>
  );
};
