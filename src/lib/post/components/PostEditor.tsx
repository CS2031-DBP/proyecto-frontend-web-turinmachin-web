'use client';

import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { Button } from '@/lib/common/components/Button';
import { FileCarousel } from '@/lib/common/components/FileCarousel';
import { Form } from '@/lib/common/components/form/Form';
import { FormTextArea } from '@/lib/common/components/form/FormTextArea';
import { ResetButton } from '@/lib/common/components/form/ResetButton';
import { TagInput } from '@/lib/common/components/form/TagInput';
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

export interface Props {
  post: PostSchema;
}

export const PostEditor = ({ post }: Props) => {
  const router = useRouter();
  const { apiClient } = useApiClient();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: pick(post, 'content', 'tags'),
  });

  const handleSubmit = async (data: FormSchema) => {
    await apiClient.updatePost(data, { params: { id: post.id } });
    router.push(routes.posts.byId(post.id));
  };

  const tags = form.watch('tags');
  const setTags = (tags: string[]) => form.setValue('tags', tags);

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <FormTextArea
        form={form}
        name="content"
        placeholder="Piensa en algo interesante..."
      />
      <TagInput value={tags} setValue={setTags} />
      {post.files.length !== 0 && (
        <>
          <FileCarousel files={post.files} contain />
          <p className="text-foreground-muted my-8 text-center">
            (Lo sentimos, no puedes editar las imágenes de un post...)
          </p>
        </>
      )}
      <div className="flex justify-end gap-x-4">
        <ResetButton form={form}>Restablecer</ResetButton>
        <Button type="submit">Guardar</Button>
      </div>
    </Form>
  );
};
