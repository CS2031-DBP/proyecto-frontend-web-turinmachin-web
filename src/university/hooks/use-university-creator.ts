import { useApiClient } from '@/api/hooks/use-api-client';
import { usePendingCallback } from '@/common/hooks/use-pending';
import { routes } from '@/common/util/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { CreateUniversitySchema } from '../schemas/create-university';

export const FormSchema = CreateUniversitySchema;
export type FormSchema = z.infer<typeof FormSchema>;

export const useUniversityCreator = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      shortName: '',
      websiteUrl: '',
      emailDomains: [],
      degreeIds: [],
    },
  });

  const { apiClient } = useApiClient();

  const [pending, handleSubmit] = usePendingCallback(
    async (data: FormSchema) => {
      const res = await apiClient.createUniversity({ body: data });
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
