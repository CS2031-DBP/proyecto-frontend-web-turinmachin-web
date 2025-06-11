import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { LuImagePlus, LuPlus, LuX } from 'react-icons/lu';
import { useNavigate } from 'react-router';
import { z } from 'zod/v4';
import { getAxiosInstance } from '../../../api/util/axios-instance';
import { usePostPopup } from '../../../post/hooks/use-post-popup';
import { PostSchema } from '../../../post/schemas/post';
import { SubmitButton } from './SubmitButton';

const FormSchema = z.object({
  content: z.string().trim().nonempty(),
  tags: z.string().toLowerCase().nonempty().array(),
  files: z.file().array(),
});

type FormSchema = z.infer<typeof FormSchema>;

export const CreatePostPopup = () => {
  const [tagInput, setTagInput] = useState('');

  const form = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: '',
      tags: [],
      files: [],
    },
  });

  const tags = form.watch('tags');
  const files = form.watch('files');

  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const { closePopup } = usePostPopup();

  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        closePopup();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closePopup]);

  const addTag = (tag: string) => {
    const clean = tag.trim().toLowerCase();
    if (clean.length === 0 || tags.includes(clean)) return;

    form.setValue('tags', [...tags, clean]);
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    form.setValue(
      'tags',
      tags.filter((t) => t !== tag),
    );
  };

  const handleTagKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (['Enter', ' '].includes(ev.key)) {
      ev.preventDefault();
      addTag(tagInput);
    } else if (
      tags.length !== 0 &&
      tagInput.length === 0 &&
      ev.key === 'Backspace'
    ) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const handleFilesChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { files: newFiles } = ev.target;
    if (newFiles !== null) {
      form.setValue('files', [...files, ...newFiles]);
      ev.target.value = '';
    }
  };

  const removeFile = (index: number) => {
    form.setValue(
      'files',
      files.filter((_, i) => i !== index),
    );
  };

  const handleSubmit = async (data: FormSchema) => {
    const formData = new FormData();
    formData.set('content', data.content);
    data.tags.forEach((t) => formData.append('tags', t));
    data.files.forEach((f) => formData.append('files', f));

    const response = await getAxiosInstance().post('/posts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    const post = await PostSchema.parseAsync(response.data);
    navigate(`/posts/${post.id}`);
    closePopup();
  };

  return (
    <div className="justify fixed top-0 left-0 z-10 grid h-screen w-screen place-items-center bg-black/75">
      <div className="bg-background-alt flex h-8/10 w-8/10 flex-col rounded-xl px-10 py-6">
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex h-full max-h-full flex-col"
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Hacer una publicación</h2>
            <button
              type="button"
              onClick={closePopup}
              className="text-foreground-muted hover:bg-muted hover:text-foreground flex h-8 w-8 cursor-pointer items-center justify-center rounded-full"
            >
              <LuX className="inline" size={20} />
            </button>
          </div>
          <div className="mb-4 h-full space-y-4 overflow-y-auto">
            <textarea
              {...form.register('content', { required: true })}
              placeholder="Piensa en algo interesante..."
              className="border-foreground-muted block w-full rounded-lg border px-4 py-2 text-xl"
            />
            <div>
              <label className="mb-2 block text-xl">Tags:</label>
              <div className="border-foreground-muted flex flex-wrap rounded-lg border px-2 py-1 text-lg">
                {tags?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-muted mx-1 my-1 inline-flex items-center rounded-full px-3 py-1 text-sm"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-foreground-muted hover:text-foreground ml-2 cursor-pointer text-sm"
                    >
                      <LuX className="inline" strokeWidth={3} />
                    </button>
                  </span>
                ))}
                <input
                  value={tagInput}
                  onChange={(ev) =>
                    setTagInput(
                      ev.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9-_]/, '')
                        .replace(/-+/, '-'),
                    )
                  }
                  onKeyDown={handleTagKeyDown}
                  className="ml-2 grow outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-5">
              {files.map((file, index) => {
                const url = URL.createObjectURL(file);
                return (
                  <div
                    key={index}
                    className="bg-background relative aspect-square overflow-hidden rounded-md"
                  >
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 z-10 cursor-pointer rounded-full bg-black/70 p-1 text-white"
                    >
                      <LuX size={16} />
                    </button>
                    {file.type.startsWith('video') ? (
                      <video
                        src={url}
                        className="h-full w-full object-cover"
                        muted
                        autoPlay
                        loop
                      />
                    ) : (
                      <img
                        src={url}
                        className="h-full w-full object-cover"
                        alt={`Preview #${index}`}
                      />
                    )}
                  </div>
                );
              })}

              {files.length < 10 && (
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="bg-muted text-muted-foreground hover:bg-foreground-muted/20 flex aspect-square cursor-pointer items-center justify-center rounded-lg"
                >
                  <LuImagePlus size={32} />
                </button>
              )}
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              hidden
              onChange={handleFilesChange}
            />
          </div>

          <div className="text-right">
            {' '}
            <SubmitButton className="bg-special hover:bg-special-muted inline-flex items-center rounded-full px-5 py-2 font-semibold enabled:cursor-pointer">
              <LuPlus size={24} className="mr-2" />
              Publicar
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
};
