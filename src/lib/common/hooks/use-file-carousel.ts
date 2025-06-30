import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FileInfoSchema } from '../schemas/file-info';

export interface UseFileCarouselOptions {
  files: FileInfoSchema[];
  keyControls: boolean;
}

export const useFileCarousel = ({
  files,
  keyControls,
}: UseFileCarouselOptions) => {
  const searchParams = useSearchParams();
  const initialIndex = Number(searchParams.get('file'));

  const [currentIndex, setCurrentIndex] = useState(
    initialIndex >= 0 && initialIndex < files.length ? initialIndex : 0,
  );
  const [direction, setDirection] = useState(0);

  const slideLeft = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + files.length) % files.length,
    );
  }, [files.length]);

  const slideRight = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % files.length);
  }, [files.length]);

  useEffect(() => {
    if (!keyControls) return;

    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'ArrowLeft') {
        slideLeft();
      } else if (ev.key === 'ArrowRight') {
        slideRight();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [keyControls, slideRight, slideLeft]);

  const currentFile = files[currentIndex];

  return {
    direction,
    currentFile,
    currentIndex,
    setCurrentIndex,
    slideLeft,
    slideRight,
  };
};
