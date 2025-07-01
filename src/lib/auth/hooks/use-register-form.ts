import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { usePopup } from '@/lib/common/hooks/use-popup';
import { removeUndefined } from '@/lib/common/util/object';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { RegisterRequestSchema } from '../schemas/register-request';

export const FormSchema = RegisterRequestSchema;
export type FormSchema = z.infer<typeof FormSchema>;

export interface UseRegisterFormOptions {
  onClose: () => void;
}

export const useRegisterForm = ({ onClose }: UseRegisterFormOptions) => {
  const router = useRouter();
  const { openPopup } = usePopup();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      username: '',
      displayName: '',
      password: '',
    },
  });

  const [pending, handleSubmit] = usePendingCallback(
    async (data: FormSchema) => {
      const res = await signIn('credentials', {
        redirect: false,
        type: 'register',
        ...removeUndefined(data),
      });

      if (res.error) {
        throw res.code ?? 'Algo salió mal :(';
      }

      onClose();
      openPopup('verification', {});
      router.refresh();
    },
    [router],
  );

  return { form, pending, handleSubmit };
};
