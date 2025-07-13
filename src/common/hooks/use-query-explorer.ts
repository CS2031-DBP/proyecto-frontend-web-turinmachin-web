import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
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

  const [debouncedQuery] = useDebounce(formData.query, 250);

  useEffect(() => {
    form.handleSubmit(onSubmit)();
  }, [debouncedQuery, form]);

  return { form, onSubmit, currentQueries };
};
