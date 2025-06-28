'use client';

import { useApiClient } from '@/lib/api/hooks/use-api-client';
import { Button } from '@/lib/common/components/Button';
import { Form } from '@/lib/common/components/form/Form';
import { FormTextArea } from '@/lib/common/components/form/FormTextArea';
import { MediaSelector } from '@/lib/common/components/form/MediaSelector';
import { TagInput } from '@/lib/common/components/form/TagInput';
import { Popup } from '@/lib/common/components/popup/Popup';
import { usePendingCallback } from '@/lib/common/hooks/use-pending';
import { usePopup } from '@/lib/common/hooks/use-popup';
import { routes } from '@/lib/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { LuPlus } from 'react-icons/lu';
import { z } from 'zod';

const FormSchema = z.object({
  content: z.string().trim().nonempty(),
  tags: z.string().array(),
  files: z.instanceof(File).array(),
});

type FormSchema = z.infer<typeof FormSchema>;

export const CreatePostPopup = () => {
  const router = useRouter();
  const { closePopup } = usePopup();
  const { apiClient } = useApiClient();

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

      const createdPost = await apiClient.createPost(formData);

      router.push(routes.posts.byId(createdPost.id));
      closePopup();
    },
    [apiClient, router],
  );

  return (
    <Popup className="mx-6 w-9/10 max-w-4xl">
      <Popup.Title>Hacer una publicación</Popup.Title>
      <Form
        form={form}
        onSubmit={handleSubmit}
        className="flex h-full max-h-full flex-col"
      >
        <div className="mb-4 h-full space-y-4 overflow-y-auto">
          <FormTextArea
            form={form}
            name="content"
            placeholder="Piensa en algo interesante..."
            autoFocus
            className="text-lg sm:text-xl"
          />
          <TagInput value={tags} setValue={setTags} />
          <MediaSelector value={files} setValue={setFiles} />
        </div>

        <div className="text-right">
          {' '}
          <Button
            variant="special"
            disabled={pending}
            className="inline-flex items-center"
          >
            <LuPlus size={24} className="mr-2" />
            Publicar
          </Button>
        </div>
      </Form>
    </Popup>
  );
};
