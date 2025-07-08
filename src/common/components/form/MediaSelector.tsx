import Image from 'next/image';
import { ChangeEvent, useRef } from 'react';
import { LuImagePlus, LuX } from 'react-icons/lu';

export interface Props {
  value: File[];
  setValue: (files: File[]) => void;
}

export const MediaSelector = ({ value: files, setValue }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFilesChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { files: newFiles } = ev.target;
    if (newFiles !== null) {
      setValue([...files, ...newFiles]);
      ev.target.value = '';
    }
  };

  const removeFile = (index: number) => {
    setValue(files.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
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
                className="absolute top-1 right-1 z-10 rounded-full bg-black/70 p-1 text-white"
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
                <Image
                  src={url}
                  className="object-cover"
                  alt={`Preview #${index}`}
                  fill
                />
              )}
            </div>
          );
        })}

        {files.length < 10 && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="bg-muted text-muted-foreground hover:bg-foreground-muted/20 flex aspect-square items-center justify-center rounded-lg"
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
    </>
  );
};
