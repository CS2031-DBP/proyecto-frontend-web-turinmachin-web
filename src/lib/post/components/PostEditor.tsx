'use client';

import { Button } from '@/lib/common/components/Button';
import { FileCarousel } from '@/lib/common/components/FileCarousel';
import { Form } from '@/lib/common/components/form/Form';
import { FormTextArea } from '@/lib/common/components/form/FormTextArea';
import { ResetButton } from '@/lib/common/components/form/ResetButton';
import { TagInput } from '@/lib/common/components/form/TagInput';
import { usePostEditor } from '../hooks/use-post-editor';
import { PostSchema } from '../schemas/post';

export interface Props {
  post: PostSchema;
}

export const PostEditor = ({ post }: Props) => {
  const { form, pending, handleSubmit, tags, setTags } = usePostEditor({
    post,
  });

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
        <Button type="submit" disabled={pending}>
          Guardar
        </Button>
      </div>
    </Form>
  );
};
