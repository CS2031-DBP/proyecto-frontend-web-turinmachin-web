import { LuX } from 'react-icons/lu';
import { useTagInput } from '../../hooks/form/use-tag-input';

export interface Props {
  value: string[];
  setValue: (tags: string[]) => void;
}
export const TagInput = ({ value, setValue }: Props) => {
  const { tagInput, setTagInput, handleKeyDown, removeTag } = useTagInput({
    value,
    setValue,
  });

  return (
    <div className="my-4">
      <label className="mb-2 block">Tags</label>
      <div className="form-input has-focus:border-special flex flex-wrap gap-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="bg-background-alt inline-flex items-center rounded-full px-3 py-1 text-sm"
          >
            <span>#{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-foreground-muted hover:text-foreground ml-2 text-sm"
            >
              <LuX className="inline" strokeWidth={3} />
            </button>
          </span>
        ))}
        <input
          placeholder="mates, examen, etc..."
          value={tagInput}
          onChange={(ev) =>
            setTagInput(
              ev.target.value
                .toLowerCase()
                .replace(/[^a-z0-9-_]/, '')
                .replace(/-+/, '-'),
            )
          }
          onKeyDown={handleKeyDown}
          className="ml-2 grow py-0.5 outline-none"
        />
      </div>
    </div>
  );
};
