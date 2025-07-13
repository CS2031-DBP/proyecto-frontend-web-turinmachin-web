'use client';
import { Button } from '@/common/components/Button';
import { Form } from '@/common/components/form/Form';
import { FormInput } from '@/common/components/form/FormInput';
import { useDegreeCreator } from '../hooks/use-degree-creator';

export const DegreeCreator = () => {
  const { form, pending, handleSubmit } = useDegreeCreator();

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
        <Button type="submit" variant="special" disabled={pending}>
          Añadir
        </Button>
      </div>
    </Form>
  );
};
