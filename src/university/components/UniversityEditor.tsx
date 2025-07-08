'use client';

import { Button } from '@/common/components/Button';
import { Form } from '@/common/components/form/Form';
import { FormInput } from '@/common/components/form/FormInput';
import { ListInput } from '@/common/components/form/ListInput';
import { ResetButton } from '@/common/components/form/ResetButton';
import { DegreeSelector } from '@/degree/components/MultiSelectDropdown';
import { DegreeSchema } from '@/degree/schemas/degree';
import { useUniversityEditor } from '../hooks/use-university-editor';
import { UniversitySchema } from '../schemas/university';

export interface Props {
  availableDegrees: DegreeSchema[];
  university: UniversitySchema;
  universityDegrees: DegreeSchema[];
}

export const UniversityEditor = ({
  availableDegrees,
  university,
  universityDegrees,
}: Props) => {
  const {
    form,
    pending,
    handleSubmit,
    emailDomains,
    addEmailDomain,
    removeEmailDomain,
    degreeIds,
    setDegreeIds,
  } = useUniversityEditor({ university, universityDegrees });

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
        <Button type="submit" variant="special" disabled={pending}>
          Guardar
        </Button>
      </div>
    </Form>
  );
};
