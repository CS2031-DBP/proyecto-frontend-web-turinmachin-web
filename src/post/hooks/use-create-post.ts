import { useApiClient } from '@/api/hooks/use-api-client';
import { usePendingCallback } from '@/common/hooks/use-pending';
import { usePopup } from '@/common/hooks/use-popup';
import { routes } from '@/common/util/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { isErrorFromAlias } from '@zodios/core';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CreatePostSchema } from '../schemas/create-post';

export const FormSchema = CreatePostSchema;
export type FormSchema = z.infer<typeof FormSchema>;

export interface UseCreatePostOptions {
  onClose: () => void;
}

export const useCreatePost = ({ onClose }: UseCreatePostOptions) => {
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

  const tags = form.watch('tags') ?? [];
  const files = form.watch('files') ?? [];

  const setTags = (tags: string[]) => form.setValue('tags', tags);
  const setFiles = (files: File[]) => form.setValue('files', files);

  const [pending, handleSubmit] = usePendingCallback(
    async (data: FormSchema) => {
      const formData = new FormData();
      formData.set('content', data.content);
      data.tags?.forEach((t) => formData.append('tags', t));
      data.files?.forEach((f) => formData.append('files', f));

      try {
        const createdPost = await apiClient.createPost(formData);
        router.push(routes.posts.byId(createdPost.id));
        onClose();
      } catch (err) {
        if (isErrorFromAlias(apiClient.api, 'createPost', err)) {
          openPopup('toxicityPost', {});
        } else {
          throw err;
        }
      }
    },
    [apiClient, router],
  );

  return { form, pending, handleSubmit, tags, files, setTags, setFiles };
};
