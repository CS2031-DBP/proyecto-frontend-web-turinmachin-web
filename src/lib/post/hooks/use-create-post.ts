import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { usePopup } from '@/lib/common/hooks/use-popup';
import { routes } from '@/lib/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { isErrorFromAlias } from '@zodios/core';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  content: z.string().trim().nonempty(),
  tags: z.string().array(),
  files: z.instanceof(File).array(),
});

type FormSchema = z.infer<typeof FormSchema>;

export interface UseCreatePost {
  onClose: () => void;
}

export const useCreatePost = ({ onClose }: UseCreatePost) => {
  const router = useRouter();
  const { apiClient } = useApiClient();
  const { openPopup } = usePopup();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: '',
      files: [],
      tags: [],
    },
  });

  const tags = form.watch('tags');
  const files = form.watch('files');

  const setTags = (tags: string[]) => form.setValue('tags', tags);
  const setFiles = (files: File[]) => form.setValue('files', files);

  const [pending, handleSubmit] = usePendingCallback(
    async (data: FormSchema) => {
      const formData = new FormData();
      formData.set('content', data.content);
      data.tags.forEach((t) => formData.append('tags', t));
      data.files.forEach((f) => formData.append('files', f));

      try {
        const createdPost = await apiClient.createPost(formData);

        router.push(routes.posts.byId(createdPost.id));
        onClose();
      } catch (err) {
        if (isErrorFromAlias(apiClient.api, 'createPost', err)) {
          openPopup('toxicityPost');
        } else {
          throw err;
        }
      }
    },
    [apiClient, router],
  );

  return { form, pending, handleSubmit, tags, files, setTags, setFiles };
};
