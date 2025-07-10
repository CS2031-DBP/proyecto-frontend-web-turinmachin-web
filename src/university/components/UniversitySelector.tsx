import { Spinner } from '@/common/components/Spinner';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { HTMLAttributes, useState } from 'react';
import { FaCircle } from 'react-icons/fa';
import { LuUniversity } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';
import { useDebounce } from 'use-debounce';
import { useUniversities } from '../hooks/use-universities';
import { UniversitySchema } from '../schemas/university';

export interface Props
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  onChange: (id: string | null) => void;
}

export const UniversitySelector = ({
  value,
  onChange,
  className,
  ...props
}: Props) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 150);
  const { universities: options } = useUniversities({
    query: debouncedQuery,
    size: 10,
  });

  const selectedUniversity = options?.find((uni) => uni.id === value) ?? null;

  const handleChange = (university: UniversitySchema | null) => {
    onChange(university?.id ?? null);
  };

  return (
    <Combobox value={selectedUniversity} onChange={handleChange} immediate>
      <div
        {...props}
        className={twMerge(
          'form-input has-focus:border-special relative flex items-center gap-x-2',
          className,
        )}
      >
        <LuUniversity className="text-foreground-muted size-5 min-w-5" />
        <ComboboxInput
          onChange={(ev) => setQuery(ev.target.value.trimStart())}
          displayValue={(uni: UniversitySchema | null) =>
            uni ? (uni.shortName ?? uni.name) : ''
          }
          placeholder="Universidad"
          className="min-w-0 outline-none"
        />
        <ComboboxOptions
          transition
          className="bg-background-alt absolute top-105/100 left-0 max-h-60 w-full overflow-auto rounded text-sm empty:invisible data-leave:data-closed:opacity-0"
        >
          {!options ? (
            <div className="w-full py-8 text-center">
              <Spinner className="size-6 border-3" />
            </div>
          ) : (
            <>
              <ComboboxOption
                key={0}
                value={null}
                className="border-muted hover:bg-foreground/5 group data-focus:bg-foreground/5 flex cursor-pointer items-center gap-x-2 px-3 py-2"
              >
                <FaCircle className="text-foreground-muted invisible size-2 group-data-selected:visible" />
                <div className="text-foreground-muted">Cualquiera</div>
              </ComboboxOption>
              {options.map((university) => (
                <ComboboxOption
                  key={university.id}
                  value={university}
                  className="border-muted hover:bg-foreground/5 group data-focus:bg-foreground/5 flex cursor-pointer items-center gap-x-2 px-3 py-2"
                >
                  <FaCircle className="text-foreground-muted invisible size-2 group-data-selected:visible" />
                  <div>{university.shortName ?? university.name}</div>
                </ComboboxOption>
              ))}
            </>
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
};
