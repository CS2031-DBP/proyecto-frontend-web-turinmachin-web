'use client';

import { useSessionApiClient } from '@/lib/auth/schemas/hooks/use-session-api-client';
import { routes } from '@/lib/routes';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes } from 'react';
import { LuTrash } from 'react-icons/lu';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  postId: string;
  session: Session;
}

export const DeletePostButton = ({ postId, session }: Props) => {
  const router = useRouter();
  const apiClient = useSessionApiClient(session);

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
