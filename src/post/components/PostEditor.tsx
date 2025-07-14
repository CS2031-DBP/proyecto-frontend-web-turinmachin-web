'use client';
import { Button } from '@/common/components/Button';
import { FileCarousel } from '@/common/components/FileCarousel';
import { Form } from '@/common/components/form/Form';
import { FormTextArea } from '@/common/components/form/FormTextArea';
import { ResetButton } from '@/common/components/form/ResetButton';
import { TagInput } from '@/common/components/TagInput';
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
        maxLength={300}
        showLengthHint
        autoComplete="off"
        placeholder="Piensa en algo interesante..."
      />
      <div className="my-4">
        <label className="mb-2 block">Tags</label>
        <TagInput
          value={tags}
          setValue={setTags}
          inputProps={{ placeholder: 'mates, examen, etc...' }}
        />
      </div>
      {post.files.length !== 0 && (
        <>
          <FileCarousel
            files={post.files}
            imageFit="contain"
            aspectRatio="16 / 9"
          />
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
