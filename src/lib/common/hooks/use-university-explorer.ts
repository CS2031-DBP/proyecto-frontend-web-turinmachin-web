import { useDebouncedEffect } from '@/lib/common/hooks/use-debounced-effect';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const FormSchema = z.object({
  query: z
    .string()
    .optional()
    .transform((s) => (s?.length === 0 ? undefined : s)),
});

export type FormSchema = z.infer<typeof FormSchema>;

export const useQueryExplorer = () => {
  const [currentQueries, setCurrentQueries] = useState<FormSchema>({
    query: '',
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
