import { HTMLAttributes, InputHTMLAttributes } from 'react';
import { LuTag, LuX } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';
import { useTagInput } from '../hooks/form/use-tag-input';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  value: string[];
  setValue: (tags: string[]) => void;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}
export const TagInput = ({
  value,
  setValue,
  inputProps: { className: inputClassName, ...inputProps } = {},
  className,
  ...props
}: Props) => {
  const { tagInput, setTagInput, handleKeyDown, removeTag, addCurrent } =
    useTagInput({
      value,
      setValue,
    });

  return (
    <div
      {...props}
      className={twMerge(
        'form-input has-focus:border-special flex items-center',
        className,
      )}
    >
      <LuTag className="text-foreground-muted mx-1 size-5 min-w-5" />
      <div className="flex min-w-0 grow flex-wrap items-center gap-2">
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
          placeholder="Tags"
          {...inputProps}
          value={tagInput}
          onBlur={addCurrent}
          onChange={(ev) =>
            setTagInput(
              ev.target.value
                .toLowerCase()
                .replace(/[^a-z0-9-_]/, '')
                .replace(/-+/, '-')
                .replace(/_+/, '_')
                .substring(0, 20),
            )
          }
          onKeyDown={handleKeyDown}
          className={twMerge(
            'ml-2 min-w-0 grow py-0.5 outline-none',
            inputClassName,
          )}
        />
      </div>
    </div>
  );
};
