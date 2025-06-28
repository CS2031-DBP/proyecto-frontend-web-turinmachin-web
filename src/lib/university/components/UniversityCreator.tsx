'use client';

import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { Button } from '@/lib/common/components/Button';
import { Form } from '@/lib/common/components/form/Form';
import { FormInput } from '@/lib/common/components/form/FormInput';
import { ListInput } from '@/lib/common/components/form/ListInput';
import { DegreeSelector } from '@/lib/degree/components/MultiSelectDropdown';
import { DegreeSchema } from '@/lib/degree/schemas/degree';
import { routes } from '@/lib/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { CreateUniversitySchema } from '../schemas/create-university';

export interface Props {
  availableDegrees: DegreeSchema[];
}

export const FormSchema = CreateUniversitySchema;
export type FormSchema = z.infer<typeof FormSchema>;

export const UniversityCreator = ({ availableDegrees }: Props) => {
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

  const handleSubmit = async (data: FormSchema) => {
    const createdUniversity = await apiClient.createUniversity(data);
    router.push(routes.universities.byId(createdUniversity.id));
  };

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

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <FormInput form={form} name="name" label="Nombre" />
      <FormInput
        form={form}
        name="shortName"
        label="Nombre corto"
        required={false}
      />
      <FormInput
        form={form}
        name="websiteUrl"
        label="Página web"
        required={false}
      />
      <ListInput
        values={emailDomains}
        addValue={addEmailDomain}
        removeValue={removeEmailDomain}
        label="Dominios de correo"
      />
      <DegreeSelector
        options={availableDegrees}
        degreeIds={degreeIds}
        setDegreeIds={setDegreeIds}
      />

      <div className="flex justify-end">
        <Button type="submit" variant="special">
          Añadir
        </Button>
      </div>
    </Form>
  );
};
