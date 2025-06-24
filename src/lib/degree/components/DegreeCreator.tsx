'use client';

import { useSessionApiClient } from '@/lib/auth/schemas/hooks/use-session-api-client';
import { Button } from '@/lib/common/components/Button';
import { Form } from '@/lib/common/components/form/Form';
import { FormInput } from '@/lib/common/components/form/FormInput';
import { routes } from '@/lib/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { CreateDegreeSchema } from '../schemas/create-degree';

export interface Props {
  session: Session;
}

export const FormSchema = CreateDegreeSchema;
export type FormSchema = z.infer<typeof FormSchema>;

export const DegreeCreator = ({ session }: Props) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      shortName: '',
    },
  });

  const apiClient = useSessionApiClient(session);

  const handleSubmit = async (data: FormSchema) => {
    const createdDegree = await apiClient.createDegree(data);
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
        <Button type="submit" variant="special">
          Añadir
        </Button>
      </div>
    </Form>
  );
};
