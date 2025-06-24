'use client';

import { useSessionApiClient } from '@/lib/auth/schemas/hooks/use-session-api-client';
import { Button } from '@/lib/common/components/Button';
import { Form } from '@/lib/common/components/form/Form';
import { FormInput } from '@/lib/common/components/form/FormInput';
import { ListInput } from '@/lib/common/components/form/ListInput';
import { ResetButton } from '@/lib/common/components/form/ResetButton';
import { pick } from '@/lib/common/util/object';
import { DegreeSelector } from '@/lib/degree/components/MultiSelectDropdown';
import { DegreeSchema } from '@/lib/degree/schemas/degree';
import { routes } from '@/lib/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { UniversitySchema } from '../schemas/university';
import { UpdateUniversitySchema } from '../schemas/update-university';

export interface Props {
  session: Session;
  availableDegrees: DegreeSchema[];
  university: UniversitySchema;
  universityDegrees: DegreeSchema[];
}

export const FormSchema = UpdateUniversitySchema;
export type FormSchema = z.infer<typeof FormSchema>;

export const UniversityEditor = ({
  session,
  availableDegrees,
  university,
  universityDegrees,
}: Props) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...pick(university, 'name', 'shortName', 'websiteUrl', 'emailDomains'),
      degreeIds: universityDegrees.map((degree) => degree.id),
    },
  });

  const apiClient = useSessionApiClient(session);

  const handleSubmit = async (data: FormSchema) => {
    const createdUniversity = await apiClient.updateUniversity(data, {
      params: { id: university.id },
    });
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
        <ResetButton form={form}>Restablecer</ResetButton>
        <Button type="submit" variant="special">
          Guardar
        </Button>
      </div>
    </Form>
  );
};
