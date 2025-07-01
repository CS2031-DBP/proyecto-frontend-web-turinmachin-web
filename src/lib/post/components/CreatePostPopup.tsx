import { Button } from '@/lib/common/components/Button';
import { Form } from '@/lib/common/components/form/Form';
import { FormTextArea } from '@/lib/common/components/form/FormTextArea';
import { MediaSelector } from '@/lib/common/components/form/MediaSelector';
import { TagInput } from '@/lib/common/components/form/TagInput';
import { Popup } from '@/lib/common/components/popup/Popup';
import { PopupComponent } from '@/lib/common/components/providers/PopupProvider';
import { LuPlus } from 'react-icons/lu';
import { useCreatePost } from '../hooks/use-create-post';

export const CreatePostPopup: PopupComponent<'post'> = ({ onClose }) => {
  const { form, pending, handleSubmit, tags, files, setTags, setFiles } =
    useCreatePost({ onClose });

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
