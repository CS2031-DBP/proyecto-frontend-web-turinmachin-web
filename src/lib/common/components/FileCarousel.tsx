'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  useCallback,
  useEffect,
  useState,
  type HTMLAttributes,
  type MouseEvent,
} from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { twJoin, twMerge } from 'tailwind-merge';
import { useHasMounted } from '../hooks/use-has-mounted';
import type { FileInfoSchema } from '../schemas/file-info';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  height?: number;
  files: FileInfoSchema[];
  keyControls?: boolean;
  contain?: boolean;
  muteVideos?: boolean;
  fullVideoControls?: boolean;
  linkTo?: string;
}

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 300 : -300,
    opacity: 0,
    position: 'absolute',
  }),
  center: {
    x: 0,
    opacity: 1,
    position: 'relative',
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -300 : 300,
    opacity: 0,
    position: 'absolute',
  }),
};

export const FileCarousel = ({
  files,
  contain = false,
  keyControls = false,
  muteVideos = true,
  fullVideoControls,
  linkTo,
  className,
  ...props
}: Props) => {
  const searchParams = useSearchParams();
  const initialIndex = Number(searchParams.get('file'));

  const [currentIndex, setCurrentIndex] = useState(
    initialIndex >= 0 && initialIndex < files.length ? initialIndex : 0,
  );
  const [direction, setDirection] = useState(0);

  const hasMounted = useHasMounted();
  const router = useRouter();

  const slideLeft = useCallback(
    (ev?: MouseEvent<HTMLButtonElement>) => {
      ev?.stopPropagation();
      setDirection(-1);
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + files.length) % files.length,
      );
    },
    [files.length],
  );

  const slideRight = useCallback(
    (ev?: MouseEvent<HTMLButtonElement>) => {
      ev?.stopPropagation();
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % files.length);
    },
    [files.length],
  );

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

  const openFileView = () => {};

  const handleClick = (ev: MouseEvent) => {
    if (!linkTo) return;

    ev.stopPropagation();
    router.push(currentIndex === 0 ? linkTo : `${linkTo}?file=${currentIndex}`);
  };

  if (files.length === 0) return null;
  console.log(files[0].blurDataUrl);

  return (
    <div
      {...props}
      role="button"
      onClick={openFileView}
      className={twMerge(
        className,
        'border-muted group relative h-64 min-h-64 overflow-hidden rounded-xl border sm:h-100 sm:min-h-100',
      )}
    >
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.div
          key={currentFile.url}
          custom={direction}
          variants={variants}
          initial={hasMounted ? 'enter' : false}
          animate="center"
          exit="exit"
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          role="button"
          onClick={linkTo ? handleClick : undefined}
          className="relative h-full w-full"
        >
          {currentFile.mediaType.startsWith('video') ? (
            <video
              key={currentFile.url}
              src={currentFile.url}
              muted={muteVideos}
              loop
              autoPlay
              controls={fullVideoControls}
              className={twJoin(
                'h-full w-full',
                contain ? 'object-contain' : 'object-cover',
              )}
            >
              Tu navegador no soporta videos :(
            </video>
          ) : (
            <Image
              key={currentFile.url}
              src={currentFile.url}
              alt=""
              fill
              sizes="70vw"
              placeholder={currentFile.blurDataUrl ? 'blur' : 'empty'}
              blurDataURL={currentFile.blurDataUrl}
              className={twJoin(contain ? 'object-contain' : 'object-cover')}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {files.length > 1 && (
        <>
          <button
            onClick={slideLeft}
            type="button"
            className="absolute top-0 left-0 h-full bg-black/75 p-6 text-white opacity-0 transition-all group-hover:opacity-40 hover:opacity-80"
          >
            <LuChevronLeft className="inline" size={36} />
          </button>
          <button
            onClick={slideRight}
            type="button"
            className="absolute top-0 right-0 h-full bg-black/75 p-6 text-white opacity-0 transition-all group-hover:opacity-40 hover:opacity-80"
          >
            <LuChevronRight className="inline" size={36} />
          </button>
          <div
            className="absolute bottom-4 left-1/2 flex -translate-x-1/2 cursor-default items-center space-x-1.5 rounded-full bg-black/65 px-2 py-2"
            onClick={(ev) => ev.stopPropagation()}
          >
            {files.map((_, index) => (
              <button
                onClick={(ev) => {
                  ev.stopPropagation();
                  setCurrentIndex(index);
                }}
                key={index}
                className={twJoin(
                  'h-1.5 rounded-full transition-all',
                  currentIndex === index ? 'w-3 bg-white' : 'w-1.5 bg-white/50',
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
