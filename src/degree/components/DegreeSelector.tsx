import { Api } from '@/api/util/api';
import { Spinner } from '@/common/components/Spinner';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { ZodiosQueryParamsByAlias } from '@zodios/core';
import { HTMLAttributes, useState } from 'react';
import { FaCircle } from 'react-icons/fa';
import { LuGraduationCap } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';
import { useDebounce } from 'use-debounce';
import { useDegrees } from '../hooks/use-degrees';
import { DegreeSchema } from '../schemas/degree';

export interface Props
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  queries?: ZodiosQueryParamsByAlias<Api, 'getDegrees'>;
  value?: string;
  nullLabel?: string;
  nullLabelPlaceholder?: boolean;
  onChange: (id: string | null) => void;
}

export const DegreeSelector = ({
  queries,
  value,
  onChange,
  nullLabel = '(Ninguna)',
  nullLabelPlaceholder = false,
  className,
  ...props
}: Props) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 150);
  const { degrees: options } = useDegrees({
    ...queries,
    query: debouncedQuery,
    size: 10,
  });

  const selectedDegree = options?.find((deg) => deg.id === value) ?? null;

  const handleChange = (degree: DegreeSchema | null) => {
    onChange(degree?.id ?? null);
  };

  return (
    <Combobox value={selectedDegree} onChange={handleChange} immediate>
      <div
        {...props}
        className={twMerge(
          'form-input has-focus:border-special relative flex items-center gap-x-2',
          className,
        )}
      >
        <LuGraduationCap className="text-foreground-muted size-5 min-w-5" />
        <ComboboxInput
          onChange={(ev) => setQuery(ev.target.value.trimStart())}
          displayValue={(deg: DegreeSchema | null) => deg?.name ?? ''}
          placeholder={nullLabelPlaceholder ? nullLabel : 'Carrera'}
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
                <div className="text-foreground-muted">{nullLabel}</div>
              </ComboboxOption>
              {options.map((degree) => (
                <ComboboxOption
                  key={degree.id}
                  value={degree}
                  className="border-muted hover:bg-foreground/5 group data-focus:bg-foreground/5 flex cursor-pointer items-center gap-x-2 px-3 py-2"
                >
                  <FaCircle className="text-foreground-muted invisible size-2 group-data-selected:visible" />
                  <div>{degree.name}</div>
                </ComboboxOption>
              ))}
            </>
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
};
