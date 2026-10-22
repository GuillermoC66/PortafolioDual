import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { motion, useMotionValue, type Transition } from "motion/react";
import type { Identity } from "../types/portfolio";
import { getLink, type LinkId } from "../data/links";

const IMAGES_BY_THEME: Record<Identity, LinkId[]> = {
  artist: [
    "artistCarousel20260810",
    "artistCarousel20250826",
    "artistCarousel20250810",
    "artistCarousel20250427",
    "artistCarouselComic",
    "artistCarousel20250225",
    "artistAnimationVideo",
  ],
  engineer: [
    "engineerCarousel20260415",
    "engineerCarouselLight",
    "engineerCarouselScreenshot",
    "engineerCarouselGithubIcon",
  ],
};

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;
const PEEK_WIDTH = 72;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
} satisfies Transition;

interface MediaSize {
  width: number;
  height: number;
}

const isVideo = (src: string) => /\.(mp4|webm|ogg)(?:[?#].*)?$/i.test(src);

const fitMediaSize = (
  size: MediaSize,
  maxWidth: number,
  maxHeight: number,
): MediaSize => {
  const scale = Math.min(1, maxWidth / size.width, maxHeight / size.height);
  return { width: size.width * scale, height: size.height * scale };
};

export const SwipeCarousel = ({ theme }: { theme: Identity }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [mediaSizes, setMediaSizes] = useState<Record<string, MediaSize>>({});
  const [viewportSize, setViewportSize] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));
  const images = IMAGES_BY_THEME[theme].map(getLink);
  const dragX = useMotionValue(0);
  const activeMediaSize = mediaSizes[images[imgIndex]];
  const slideWidth = viewportSize.width * 0.7;
  const slideOffset = (viewportSize.width - slideWidth) / 2 - imgIndex * slideWidth;
  const maxMediaHeight = Math.max(120, viewportSize.height - 200);
  const activeHeight = activeMediaSize
    ? fitMediaSize(activeMediaSize, slideWidth, maxMediaHeight).height
    : Math.min(slideWidth, maxMediaHeight);

  useEffect(() => {
    const updateViewportSize = () => {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", updateViewportSize);
    return () => window.removeEventListener("resize", updateViewportSize);
  }, []);

  useEffect(() => {
    setImgIndex(0);
  }, [theme]);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setImgIndex((pv) => {
          if (pv === images.length - 1) {
            return 0;
          }
          return pv + 1;
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, [dragX, images.length]);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < images.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };

  return (
    <div className="relative overflow-hidden bg-background py-8 transition-colors duration-300">
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `${slideOffset}px`,
          height: activeHeight,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center active:cursor-grabbing"
      >
        <Images
          images={images}
          imgIndex={imgIndex}
          slideWidth={slideWidth}
          onMediaLoad={(src, width, height) => {
            setMediaSizes((current) => ({ ...current, [src]: { width, height } }));
          }}
        />
      </motion.div>

      <Dots images={images} imgIndex={imgIndex} setImgIndex={setImgIndex} />
      <GradientEdges />
      {imgIndex > 0 && (
        <SidePeek
          key={`left-${images[imgIndex - 1]}`}
          src={images[imgIndex - 1]}
          side="left"
          height={activeHeight}
          onClick={() => setImgIndex((index) => index - 1)}
        />
      )}
      {imgIndex < images.length - 1 && (
        <SidePeek
          key={`right-${images[imgIndex + 1]}`}
          src={images[imgIndex + 1]}
          side="right"
          height={activeHeight}
          onClick={() => setImgIndex((index) => index + 1)}
        />
      )}
    </div>
  );
};

const SidePeek = ({
  src,
  side,
  height,
  onClick,
}: {
  src: string;
  side: "left" | "right";
  height: number;
  onClick: () => void;
}) => (
  <motion.button
    type="button"
    aria-label={`Show ${side === "left" ? "previous" : "next"} image`}
    onClick={onClick}
    style={{ width: PEEK_WIDTH, height }}
    initial={{ opacity: 0, x: side === "left" ? -PEEK_WIDTH : PEEK_WIDTH }}
    animate={{ opacity: 0.5, x: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className={`absolute top-8 z-20 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
      side === "left" ? "left-0 rounded-r-lg" : "right-0 rounded-l-lg"
    }`}
  >
    {isVideo(src) ? (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className={`h-full w-full object-cover ${side === "left" ? "object-right" : "object-left"}`}
      />
    ) : (
      <img
        src={src}
        alt=""
        className={`h-full w-full object-cover ${side === "left" ? "object-right" : "object-left"}`}
      />
    )}
  </motion.button>
);

const Images = ({
  images,
  imgIndex,
  slideWidth,
  onMediaLoad,
}: {
  images: string[];
  imgIndex: number;
  slideWidth: number;
  onMediaLoad: (src: string, width: number, height: number) => void;
}) => {
  return (
    <>
      {images.map((imgSrc, idx) => {
        const handleLoad = (width: number, height: number) => {
          if (width > 0 && height > 0) onMediaLoad(imgSrc, width, height);
        };

        const media = isVideo(imgSrc) ? (
          <video
            src={imgSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onLoadedMetadata={(event) =>
              handleLoad(event.currentTarget.videoWidth, event.currentTarget.videoHeight)
            }
            className="block max-h-full max-w-full rounded-xl object-contain"
          />
        ) : (
          <img
            src={imgSrc}
            alt=""
            onLoad={(event) =>
              handleLoad(event.currentTarget.naturalWidth, event.currentTarget.naturalHeight)
            }
            className="block max-h-full max-w-full rounded-xl object-contain"
          />
        );
        return (
          <div
            key={imgSrc}
            style={{ width: slideWidth }}
            className="flex h-full shrink-0 items-center justify-center"
          >
            <motion.div
              animate={{ scale: imgIndex === idx ? 0.95 : 0.85 }}
              transition={SPRING_OPTIONS}
              className={`flex h-full w-full items-center justify-center ${
                imgIndex === idx ? "opacity-100" : "opacity-0"
              }`}
            >
              {media}
            </motion.div>
          </div>
        );
      })}
    </>
  );
};

const Dots = ({
  images,
  imgIndex,
  setImgIndex,
}: {
  images: string[];
  imgIndex: number;
  setImgIndex: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="mt-4 flex w-full justify-center gap-2">
      {images.map((_, idx) => {
        return (
          <button
            key={idx}
            onClick={() => setImgIndex(idx)}
            className={`h-3 w-3 rounded-full transition-colors ${
              idx === imgIndex ? "bg-primary" : "bg-accent/50"
            }`}
          />
        );
      })}
    </div>
  );
};

const GradientEdges = () => {
  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[16vw] max-w-[180px] bg-gradient-to-r from-background to-background/0" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[16vw] max-w-[180px] bg-gradient-to-l from-background to-background/0" />
    </>
  );
};