import { useApiClient } from '@/api/hooks/use-api-client';
import { usePendingCallback } from '@/common/hooks/use-pending';
import { pick } from '@/common/util/object';
import { routes } from '@/common/util/routes';
import { DegreeSchema } from '@/degree/schemas/degree';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import z from 'zod/v4';
import { UniversitySchema } from '../schemas/university';
import { UpdateUniversitySchema } from '../schemas/update-university';

export interface UseUniversityEditorOptions {
  university: UniversitySchema;
  universityDegrees: DegreeSchema[];
}

export const FormSchema = UpdateUniversitySchema;
export type FormSchema = z.infer<typeof FormSchema>;

export const useUniversityEditor = ({
  university,
  universityDegrees,
}: UseUniversityEditorOptions) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...pick(university, 'name', 'shortName', 'websiteUrl', 'emailDomains'),
      degreeIds: universityDegrees.map((degree) => degree.id),
    },
  });

  const { apiClient } = useApiClient();

  const [pending, handleSubmit] = usePendingCallback(
    async (data: FormSchema) => {
      const res = await apiClient.updateUniversity({
        params: { id: university.id },
        body: data,
      });
      router.push(routes.universities.byId(res.body.id));
    },
    [router, apiClient],
  );

  const emailDomains = form.watch('emailDomains');

  const addEmailDomain = (domain: string) => {
    form.setValue('emailDomains', [...emailDomains, domain]);
  };

  const removeEmailDomain = (domain: string) => {
    form.setValue(
      'emailDomains',
      emailDomains.filter((d) => d !== domain),
    );
  };

  const degreeIds = form.watch('degreeIds');

  const setDegreeIds = (degreeIds: string[]) => {
    form.setValue('degreeIds', degreeIds);
  };

  return {
    form,
    pending,
    handleSubmit,
    emailDomains,
    addEmailDomain,
    removeEmailDomain,
    degreeIds,
    setDegreeIds,
  };
};
