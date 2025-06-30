'use client';

import { Button } from '@/lib/common/components/Button';
import { Form } from '@/lib/common/components/form/Form';
import { FormInput } from '@/lib/common/components/form/FormInput';
import { ResetButton } from '@/lib/common/components/form/ResetButton';
import { useDegreeEditor } from '../hooks/use-degree-editor';
import { DegreeSchema } from '../schemas/degree';

export interface Props {
  degree: DegreeSchema;
}

export const DegreeEditor = ({ degree }: Props) => {
  const { form, pending, handleSubmit } = useDegreeEditor({ degree });

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
        <Button type="submit" variant="special" disabled={pending}>
          Guardar
        </Button>
      </div>
    </Form>
  );
};
