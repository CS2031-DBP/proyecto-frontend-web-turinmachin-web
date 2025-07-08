import { useApiClient } from '@/api/hooks/use-api-client';
import { usePendingCallback } from '@/common/hooks/use-pending';
import { routes } from '@/common/util/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { CreateDegreeSchema } from '../schemas/create-degree';

export const FormSchema = CreateDegreeSchema;
export type FormSchema = z.infer<typeof FormSchema>;

export const useDegreeCreator = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      shortName: '',
    },
  });

  const { apiClient } = useApiClient();

  const [pending, handleSubmit] = usePendingCallback(
    async (data: FormSchema) => {
      const createdDegree = await apiClient.createDegree(data);
      router.push(routes.degrees.byId(createdDegree.id));
    },
    [router, apiClient],
  );

  return { form, pending, handleSubmit };
};
