'use client';

import { useSessionApiClient } from '@/lib/auth/schemas/hooks/use-session-api-client';
import { Button } from '@/lib/common/components/Button';
import { Form } from '@/lib/common/components/form/Form';
import { FormInput } from '@/lib/common/components/form/FormInput';
import { ResetButton } from '@/lib/common/components/form/ResetButton';
import { pick } from '@/lib/common/util/object';
import { routes } from '@/lib/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { DegreeSchema } from '../schemas/degree';
import { UpdateDegreeSchema } from '../schemas/update-degree';

export interface Props {
  session: Session;
  degree: DegreeSchema;
}

export const FormSchema = UpdateDegreeSchema;
export type FormSchema = z.infer<typeof FormSchema>;

export const DegreeEditor = ({ degree, session }: Props) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: pick(degree, 'name', 'shortName'),
  });

  const apiClient = useSessionApiClient(session);

  const handleSubmit = async (data: FormSchema) => {
    const createdDegree = await apiClient.updateDegree(data, {
      params: { id: degree.id },
    });
    router.push(routes.degrees.byId(createdDegree.id));
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
      <div className="flex justify-end">
        <ResetButton form={form}>Restablecer</ResetButton>
        <Button type="submit" variant="special">
          Guardar
        </Button>
      </div>
    </Form>
  );
};
