import { Button } from '@/common/components/Button';
import { Form } from '@/common/components/form/Form';
import { FormTextArea } from '@/common/components/form/FormTextArea';
import { MediaSelector } from '@/common/components/form/MediaSelector';
import { Popup } from '@/common/components/popup/Popup';
import { TagInput } from '@/common/components/TagInput';
import { PopupComponent } from '@/common/context/PopupProvider';
import { LuPlus, LuSparkles } from 'react-icons/lu';
import { useCreatePost } from '../../hooks/use-create-post';

export const CreatePostPopup: PopupComponent<'post'> = ({ onClose }) => {
  const { form, pending, handleSubmit, files, setFiles, tags, setTags } =
    useCreatePost({
      onClose,
    });

  return (
    <Popup className="mx-6 w-9/10 max-w-4xl" disableClickOutside>
      <Popup.Title>Publicar</Popup.Title>
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
            rows={4}
            maxLength={300}
            showLengthHint
            autoComplete="off"
            className="text-lg sm:text-xl"
          />

          <div className="my-4">
            <label className="mb-2 block">Tags</label>
            <div className="flex items-center gap-2">
              <TagInput
                value={tags}
                setValue={setTags}
                inputProps={{ placeholder: 'mates, examen, etc...' }}
                className="flex-1"
              />
              <button
                type="button"
                title="Sugerir etiquetas"
                className="bg-special hover:bg-special-muted inline-flex items-center gap-1 rounded-full px-3 py-2.5 text-sm font-semibold shadow-sm transition"
                onClick={() => {
                  // Aquí se llamará al endpoint más adelante
                }}
              >
                <LuSparkles className="h-4 w-4" />
                Sugerir
              </button>
            </div>
          </div>

          <MediaSelector value={files} setValue={setFiles} />
        </div>

        <div className="text-right">
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
