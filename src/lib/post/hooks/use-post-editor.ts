import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { pick } from '@/lib/common/util/object';
import { routes } from '@/lib/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PostSchema } from '../schemas/post';
import { UpdatePostSchema } from '../schemas/update-post';

export const FormSchema = UpdatePostSchema;
export type FormSchema = z.infer<typeof FormSchema>;

interface UsePostEditorOptions {
  post: PostSchema;
}

export const usePostEditor = ({ post }: UsePostEditorOptions) => {
  const router = useRouter();
  const { apiClient } = useApiClient();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: pick(post, 'content', 'tags'),
  });

  const [pending, handleSubmit] = usePendingCallback(
    async (data: FormSchema) => {
      await apiClient.updatePost(data, { params: { id: post.id } });
      router.push(routes.posts.byId(post.id));
    },
    [router, apiClient],
  );

  const tags = form.watch('tags');
  const setTags = (tags: string[]) => form.setValue('tags', tags);

  return { form, pending, handleSubmit, tags, setTags };
};
