import { useState } from 'react';
import { Slide } from 'yet-another-react-lightbox';
import { FileInfoSchema } from '../schemas/file-info';

export const useFileCarousel = (files: FileInfoSchema[]) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const toggleOpen = (state: boolean) => () => setOpen(state);

  const updateIndex =
    (when: boolean) =>
    ({ index: current }: { index: number }) => {
      if (when === open) {
        setIndex(current);
      }
    };

  const slides: Slide[] = files.map((file) =>
    file.mediaType.startsWith('video')
      ? {
          type: 'video',
          sources: [{ src: file.url, type: 'video/mp4' }],
        }
      : {
          type: 'image',
          src: file.url,
        },
  );

  return { slides, index, updateIndex, open, toggleOpen };
};
