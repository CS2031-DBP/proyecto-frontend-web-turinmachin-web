'use client';

import { Button } from '@/common/components/Button';
import { Form } from '@/common/components/form/Form';
import { FormError } from '@/common/components/form/FormError';
import { FormInput } from '@/common/components/form/FormInput';
import { ListInput } from '@/common/components/form/ListInput';
import { DegreeSelector } from '@/degree/components/MultiSelectDropdown';
import { DegreeSchema } from '@/degree/schemas/degree';
import { ErrorMessage } from '@hookform/error-message';
import { useUniversityCreator } from '../hooks/use-university-creator';

export interface Props {
  availableDegrees: DegreeSchema[];
}

export const UniversityCreator = ({ availableDegrees }: Props) => {
  const {
    form,
    pending,
    handleSubmit,
    emailDomains,
    addEmailDomain,
    removeEmailDomain,
    degreeIds,
    setDegreeIds,
  } = useUniversityCreator();

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
      <ErrorMessage
        name="emailDomains"
        errors={form.formState.errors}
        render={FormError}
      />

      <DegreeSelector
        options={availableDegrees}
        degreeIds={degreeIds}
        setDegreeIds={setDegreeIds}
      />

      <div className="flex justify-end">
        <Button type="submit" variant="special" disabled={pending}>
          Añadir
        </Button>
      </div>
    </Form>
  );
};
