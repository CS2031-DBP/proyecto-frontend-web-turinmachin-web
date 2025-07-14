'use client';
import { twJoin } from 'tailwind-merge';
import LightBox, { Lightbox } from 'yet-another-react-lightbox';
import Inline from 'yet-another-react-lightbox/plugins/inline';
import Video from 'yet-another-react-lightbox/plugins/video';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { useFileCarousel } from '../hooks/use-file-carousel';
import type { FileInfoSchema } from '../schemas/file-info';

export interface Props {
  aspectRatio: string;
  height?: number;
  files: FileInfoSchema[];
  imageFit?: 'contain' | 'cover';
  muteVideos?: boolean;
  fullVideoControls?: boolean;
}

export const FileCarousel = ({
  files,
  imageFit = 'cover',
  muteVideos = true,
  fullVideoControls = false,
  aspectRatio,
}: Props) => {
  const { slides, index, updateIndex, open, toggleOpen } =
    useFileCarousel(files);

  const videoOptions = {
    autoPlay: true,
    playsInline: true,
    loop: true,
    controls: fullVideoControls,
  };

  return (
    <div className="relative my-4">
      <LightBox
        index={index}
        plugins={[Video, Inline]}
        on={{ view: updateIndex(false), click: toggleOpen(true) }}
        video={{ ...videoOptions, muted: muteVideos }}
        carousel={{ padding: 0, spacing: 0, imageFit }}
        inline={{
          className:
            'rounded-lg overflow-hidden mx-0 my-auto cursor-pointer border border-muted',
          style: { aspectRatio },
        }}
        slides={slides}
      />
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 cursor-default items-center space-x-1.5 rounded-full bg-black/65 px-2 py-2">
        {files.map((_, i) => (
          <button
            key={i}
            className={twJoin(
              'h-1.5 rounded-full transition-all',
              index === i ? 'w-3 bg-white' : 'w-1.5 bg-white/50',
            )}
          />
        ))}
      </div>

      <Lightbox
        plugins={[Video, Zoom]}
        open={open}
        close={toggleOpen(false)}
        index={index}
        slides={slides}
        carousel={{ padding: 0, spacing: 0 }}
        on={{ view: updateIndex(true) }}
        animation={{ fade: 0 }}
        controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
        video={videoOptions}
      />
    </div>
  );
};
