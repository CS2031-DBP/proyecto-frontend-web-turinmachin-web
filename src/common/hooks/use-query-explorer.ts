import { useDebouncedEffect } from '@/common/hooks/use-debounced-effect';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';

export const FormSchema = z.object({
  query: z
    .string()
    .optional()
    .transform((s) => (s?.length === 0 ? undefined : s)),
});

export type FormSchema = z.infer<typeof FormSchema>;

export interface UseQueryExplorerOptions {
  defaultValues?: Partial<FormSchema>;
}

export const useQueryExplorer = ({
  defaultValues,
}: UseQueryExplorerOptions = {}) => {
  const [currentQueries, setCurrentQueries] = useState<FormSchema>({
    query: '',
    ...defaultValues,
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: currentQueries,
  });

  const onSubmit = (data: FormSchema) => {
    setCurrentQueries(data);
  };

  const formData = form.watch();

  useDebouncedEffect(() => form.handleSubmit(onSubmit)(), 250, [
    formData.query,
  ]);

  return { form, onSubmit, currentQueries };
};
