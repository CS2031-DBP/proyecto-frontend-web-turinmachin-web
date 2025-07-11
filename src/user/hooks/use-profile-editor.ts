import { useApiClient } from '@/api/hooks/use-api-client';
import { usePendingCallback } from '@/common/hooks/use-pending';
import { pick } from '@/common/util/object';
import { routes } from '@/common/util/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { UpdateUserSchema } from '../schemas/update-user';
import { UserSchema } from '../schemas/user';
import { useSessionUser } from './use-session-user';

export const FormSchema = UpdateUserSchema;
export type FormSchema = z.infer<typeof FormSchema>;

export interface UseProfileEditorOptions {
  user: UserSchema;
}

export const useProfileEditor = ({ user }: UseProfileEditorOptions) => {
  const { mutate: mutateUser } = useSessionUser();
  const { apiClient } = useApiClient();
  const { update: updateSession } = useSession();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...pick(user, 'email', 'username', 'displayName', 'bio'),
      degreeId: user.degree?.id,
    },
  });

  const [pending, handleSubmit] = usePendingCallback(
    async (data: FormSchema) => {
      const res = await apiClient.updateSelf({ body: data });
      const newUser = res.body;

      await updateSession(newUser);
      await mutateUser(newUser);
      router.push(routes.users.byUsername(newUser.username));
    },
    [],
  );

  return { form, pending, handleSubmit };
};
