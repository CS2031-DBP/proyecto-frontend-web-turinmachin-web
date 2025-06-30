import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { pick } from '@/lib/common/util/object';
import { routes } from '@/lib/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { DegreeSchema } from '../schemas/degree';
import { UpdateDegreeSchema } from '../schemas/update-degree';

export interface UseDegreeEditorOptions {
  degree: DegreeSchema;
}

export const FormSchema = UpdateDegreeSchema;
export type FormSchema = z.infer<typeof FormSchema>;

export const useDegreeEditor = ({ degree }: UseDegreeEditorOptions) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: pick(degree, 'name', 'shortName'),
  });

  const { apiClient } = useApiClient();

  const [pending, handleSubmit] = usePendingCallback(
    async (data: FormSchema) => {
      const createdDegree = await apiClient.updateDegree(data, {
        params: { id: degree.id },
      });
      router.push(routes.degrees.byId(createdDegree.id));
    },
    [router, apiClient],
  );

  return { form, pending, handleSubmit };
};
