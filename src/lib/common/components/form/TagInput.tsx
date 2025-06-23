import { useState } from 'react';
import { LuX } from 'react-icons/lu';

export interface Props {
  value: string[];
  setValue: (tags: string[]) => void;
}
export const TagInput = ({ value, setValue }: Props) => {
  const [tagInput, setTagInput] = useState('');

  const addTag = (tag: string) => {
    const clean = tag.trim().toLowerCase();
    if (clean.length === 0 || value.includes(clean)) return;

    setValue([...value, clean]);
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setValue(value.filter((t) => t !== tag));
  };

  const handleTagKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (['Enter', ' '].includes(ev.key)) {
      ev.preventDefault();
      addTag(tagInput);
    } else if (
      value.length !== 0 &&
      tagInput.length === 0 &&
      ev.key === 'Backspace'
    ) {
      removeTag(value[value.length - 1]);
    }
  };

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
          onKeyDown={handleTagKeyDown}
          className="ml-2 grow py-0.5 outline-none"
        />
      </div>
    </div>
  );
};
