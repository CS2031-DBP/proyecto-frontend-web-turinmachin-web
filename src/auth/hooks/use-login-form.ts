import { usePendingCallback } from '@/common/hooks/use-pending';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LoginRequestSchema } from '../schemas/login-request';

export const FormSchema = LoginRequestSchema;
export type FormSchema = z.infer<typeof FormSchema>;

export interface UseLoginFormOptions {
  onClose: () => void;
}

export const useLoginForm = ({ onClose }: UseLoginFormOptions) => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const [pending, handleSubmit] = usePendingCallback(
    async (data: FormSchema) => {
      const res = await signIn('credentials', { redirect: false, ...data });

      if (res.error) {
        throw res.code ?? 'Algo salió mal :(';
      }

      onClose();
      router.refresh();
    },
    [router],
  );

  return { form, pending, handleSubmit };
};
