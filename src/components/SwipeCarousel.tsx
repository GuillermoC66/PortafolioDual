import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useAnimationFrame, wrap } from 'motion/react';
import { Play, Pause, X, Maximize2, ArrowUpRight, ExternalLink, Wind } from 'lucide-react';
import type { Identity } from '../types/portfolio';
import {
  getCarouselItems,
  type CarouselItemData,
  type MediaItemConfig,
} from '../data/carousel';

type ActiveModal =
  | {
    type: 'media';
    src: string;
    title: string;
    description: string;
    tags: string[];
    actionLabel: string;
    actionHref: string;
    colorClass: string;
  }
  | { type: 'demo'; title: string; url: string };

const isVideo = (src: string) => /\.(mp4|webm|ogg)(?:[?#].*)?$/i.test(src);
const BASE_SPEED = -50; // default auto-scroll speed in px/s (leftwards)

// Carousel card height (+33% increase across breakpoints: 256px->340px, 288px->384px, 320px->426px, 340px->455px)
export const CAROUSEL_CARD_HEIGHT = 'h-[340px] sm:h-[384px] md:h-[426px] lg:h-[455px]';

export function SwipeCarousel({ theme, id = 'home' }: { theme: Identity; id?: string }) {
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);

  const x = useMotionValue(0);
  const setRef = useRef<HTMLDivElement>(null);
  const [setWidth, setSetWidth] = useState(0);

  const isDraggingRef = useRef(false);
  const didDragRef = useRef(false);
  const velocityRef = useRef(BASE_SPEED);

  // Map theme to items with descriptions, labels, tags, and navigation stubs
  const baseItems: CarouselItemData[] = useMemo(() => {
    return getCarouselItems(theme);
  }, [theme]);

  // Ensure each set is sufficiently wide so one set comfortably fills any screen
  const singleSet = useMemo(() => {
    const minItems = 8;
    const repeatFactor = Math.max(1, Math.ceil(minItems / baseItems.length));
    const items: CarouselItemData[] = [];
    for (let i = 0; i < repeatFactor; i++) {
      items.push(...baseItems);
    }
    return items;
  }, [baseItems]);

  // Measure single set width with ResizeObserver for exact seamless wrap
  useEffect(() => {
    if (!setRef.current) return;

    const updateWidth = () => {
      if (setRef.current) {
        setSetWidth(setRef.current.scrollWidth);
      }
    };

    updateWidth();
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setSetWidth(entry.contentRect.width);
        }
      }
    });

    ro.observe(setRef.current);
    window.addEventListener('resize', updateWidth);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateWidth);
    };
  }, [singleSet]);

  // Reset x and velocity when theme changes
  useEffect(() => {
    x.set(0);
    velocityRef.current = BASE_SPEED;
  }, [theme, x]);

  // Smooth continuous auto-scroll + physics inertia loop
  useAnimationFrame((_, delta) => {
    if (setWidth <= 0) return;
    if (isDraggingRef.current) return;

    // Target speed: 0 when paused or hovered; BASE_SPEED when auto-flowing
    const targetSpeed = isPaused || isHovered ? 0 : BASE_SPEED;

    // Smoothly decay fling velocity toward target speed (spring-like friction)
    const friction = 0.06;
    velocityRef.current =
      velocityRef.current + (targetSpeed - velocityRef.current) * friction;

    // Advance position and wrap within [-setWidth, 0] seamlessly
    const step = velocityRef.current * (delta / 1000);
    const nextX = wrap(-setWidth, 0, x.get() + step);
    x.set(nextX);
  });

  const canClick = useCallback(() => !didDragRef.current, []);

  // Close modals on Escape key and manage body scroll
  useEffect(() => {
    if (!activeModal) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveModal(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [activeModal]);

  return (
    <section
      id={id}
      aria-label="Home showcase carousel"
      className="relative w-full overflow-hidden bg-background pt-4 pb-2 transition-colors duration-300 scroll-mt-24 md:pt-6 md:pb-3"
    >
      {/* Edge gradient overlays for depth and smooth transition into background */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background via-background/80 to-transparent sm:w-28 md:w-44"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background via-background/80 to-transparent sm:w-28 md:w-44"
        aria-hidden="true"
      />

      {/* Masked viewport: images smoothly fade out as they reach left and right borders */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.85) 8%, rgba(0,0,0,1) 16%, rgba(0,0,0,1) 84%, rgba(0,0,0,0.85) 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.85) 8%, rgba(0,0,0,1) 16%, rgba(0,0,0,1) 84%, rgba(0,0,0,0.85) 92%, transparent 100%)',
        }}
      >
        <motion.div
          key={theme}
          style={{ x }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onPanStart={() => {
            isDraggingRef.current = true;
            didDragRef.current = false;
          }}
          onPan={(_, info) => {
            if (Math.abs(info.offset.x) > 6) {
              didDragRef.current = true;
            }
            if (setWidth > 0) {
              const nextX = wrap(-setWidth, 0, x.get() + info.delta.x);
              x.set(nextX);
              velocityRef.current = info.velocity.x;
            }
          }}
          onPanEnd={(_, info) => {
            isDraggingRef.current = false;
            velocityRef.current = info.velocity.x;
            // Short delay prevents click events from triggering on release after drag
            setTimeout(() => {
              didDragRef.current = false;
            }, 80);
          }}
          className="flex w-max items-center cursor-grab active:cursor-grabbing select-none touch-pan-y"
        >
          {/* Set 1: Measured set */}
          <div ref={setRef} className="flex shrink-0 items-center">
            {singleSet.map((item, index) =>
              item.type === 'media' ? (
                <MediaCarouselItem
                  key={`a-${index}-${item.id}`}
                  item={item}
                  canClick={canClick}
                  onSelect={() =>
                    setActiveModal({
                      type: 'media',
                      src: item.src,
                      title: item.title,
                      description: item.description,
                      tags: item.tags,
                      actionLabel: item.actionLabel,
                      actionHref: item.actionHref,
                      colorClass: item.colorClass,
                    })
                  }
                />
              ) : (
                <RainbowRelaxCarouselItem
                  key={`a-${index}-${item.id}`}
                  canClick={canClick}
                  onSelect={() =>
                    setActiveModal({
                      type: 'demo',
                      title: 'Rainbow Relax',
                      url: item.demoUrl,
                    })
                  }
                />
              ),
            )}
          </div>

          {/* Set 2: Duplicate */}
          <div className="flex shrink-0 items-center" aria-hidden="true">
            {singleSet.map((item, index) =>
              item.type === 'media' ? (
                <MediaCarouselItem
                  key={`b-${index}-${item.id}`}
                  item={item}
                  canClick={canClick}
                  onSelect={() =>
                    setActiveModal({
                      type: 'media',
                      src: item.src,
                      title: item.title,
                      description: item.description,
                      tags: item.tags,
                      actionLabel: item.actionLabel,
                      actionHref: item.actionHref,
                      colorClass: item.colorClass,
                    })
                  }
                />
              ) : (
                <RainbowRelaxCarouselItem
                  key={`b-${index}-${item.id}`}
                  canClick={canClick}
                  onSelect={() =>
                    setActiveModal({
                      type: 'demo',
                      title: 'Rainbow Relax',
                      url: item.demoUrl,
                    })
                  }
                />
              ),
            )}
          </div>

          {/* Set 3: Triplicate ensures 100% infinite coverage in both directions */}
          <div className="flex shrink-0 items-center" aria-hidden="true">
            {singleSet.map((item, index) =>
              item.type === 'media' ? (
                <MediaCarouselItem
                  key={`c-${index}-${item.id}`}
                  item={item}
                  canClick={canClick}
                  onSelect={() =>
                    setActiveModal({
                      type: 'media',
                      src: item.src,
                      title: item.title,
                      description: item.description,
                      tags: item.tags,
                      actionLabel: item.actionLabel,
                      actionHref: item.actionHref,
                      colorClass: item.colorClass,
                    })
                  }
                />
              ) : (
                <RainbowRelaxCarouselItem
                  key={`c-${index}-${item.id}`}
                  canClick={canClick}
                  onSelect={() =>
                    setActiveModal({
                      type: 'demo',
                      title: 'Rainbow Relax',
                      url: item.demoUrl,
                    })
                  }
                />
              ),
            )}
          </div>
        </motion.div>
      </div>

      {/* Centered Control Bar */}
      <div className="mt-3 flex w-full flex-col items-center justify-center gap-1.5 px-6">
        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          aria-label={isPaused ? 'Resume auto scroll' : 'Pause auto scroll'}
          className="group flex items-center gap-2 rounded-full border border-accent/30 bg-background/90 px-4 py-1.5 text-xs font-semibold text-text shadow-xs backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-accent hover:bg-accent/10 hover:text-primary hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent cursor-pointer"
        >
          {isPaused ? (
            <>
              <Play className="h-3.5 w-3.5 fill-current text-primary" />
              <span>Resume</span>
            </>
          ) : (
            <>
              <Pause className="h-3.5 w-3.5 text-primary" />
              <span>Pause</span>
            </>
          )}
        </button>
        <p className="text-[11px] tracking-wide text-text/50">
          Swipe or drag to browse · Click to explore the projects
        </p>
      </div>

      {/* Media Lightbox & Live Preview Modals */}
      <AnimatePresence>
        {activeModal?.type === 'media' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={activeModal.title}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-accent/25 bg-background shadow-2xl"
            >
              {/* Media viewer container */}
              <div className="relative flex max-h-[58vh] sm:max-h-[64vh] w-full items-center justify-center overflow-hidden bg-black/45">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  aria-label="Close preview"
                  className="absolute right-3.5 top-3.5 z-30 rounded-full bg-black/70 p-2 text-white/90 backdrop-blur-xs transition hover:bg-black hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>

                {isVideo(activeModal.src) ? (
                  <video
                    src={activeModal.src}
                    controls
                    autoPlay
                    loop
                    className="max-h-[58vh] sm:max-h-[64vh] w-auto max-w-full object-contain"
                  />
                ) : (
                  <img
                    src={activeModal.src}
                    alt={activeModal.title}
                    draggable={false}
                    className="max-h-[58vh] sm:max-h-[64vh] w-auto max-w-full object-contain select-none"
                  />
                )}
              </div>

              {/* Description & metadata footer */}
              <div className="flex flex-col gap-3.5 p-5 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-primary">
                      {activeModal.title}
                    </h3>
                    <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-text/80">
                      {activeModal.description}
                    </p>
                  </div>

                  <a
                    href={activeModal.actionHref}
                    target={activeModal.actionHref.startsWith('http') ? '_blank' : undefined}
                    rel={activeModal.actionHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:scale-105 active:scale-95 ${activeModal.colorClass}`}
                  >
                    <span>{activeModal.actionLabel}</span>
                    <ArrowUpRight size={14} className="stroke-[2.2]" />
                  </a>
                </div>

                {activeModal.tags && activeModal.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1 border-t border-accent/15">
                    {activeModal.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeModal?.type === 'demo' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-black/75 p-3 backdrop-blur-sm sm:p-6"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setActiveModal(null);
            }}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-label={`${activeModal.title} live preview`}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="flex h-[min(88vh,820px)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-background shadow-2xl border border-accent/20"
            >
              <header className="flex shrink-0 items-center justify-between gap-4 border-b border-accent/15 px-4 py-3 sm:px-6">
                <div>
                  <h2 className="font-semibold text-primary">{activeModal.title}</h2>
                  <p className="text-xs text-text/55">The Trevor Project · Live preview</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={activeModal.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-accent/25 px-3 py-2 text-xs font-semibold text-text transition hover:bg-accent/10 sm:px-4"
                  >
                    <span className="hidden sm:inline">Open in new tab</span>
                    <ExternalLink size={15} />
                  </a>
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    aria-label="Close preview"
                    className="grid size-9 place-items-center rounded-full border border-accent/25 text-text transition hover:bg-accent/10"
                  >
                    <X size={17} />
                  </button>
                </div>
              </header>
              <iframe
                src={activeModal.url}
                title={`${activeModal.title} experience`}
                className="min-h-0 flex-1 border-0 bg-white"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                allow="fullscreen"
                allowFullScreen
              />
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

interface MediaCarouselItemProps {
  item: MediaItemConfig;
  onSelect: () => void;
  canClick: () => boolean;
}

function MediaCarouselItem({ item, onSelect, canClick }: MediaCarouselItemProps) {
  const isMediaVideo = isVideo(item.src);
  const isExternal = item.actionHref.startsWith('http');

  return (
    <div className="shrink-0 px-3">
      <div
        onClick={() => {
          if (canClick()) onSelect();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`View ${item.title}`}
        className={`group relative ${CAROUSEL_CARD_HEIGHT} cursor-pointer overflow-hidden rounded-2xl border border-accent/20 bg-accent/5 shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-accent hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent`}
      >
        {isMediaVideo ? (
          <video
            src={item.src}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            draggable={false}
            className="block h-full w-auto max-w-none rounded-2xl object-cover pointer-events-none select-none transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <img
            src={item.src}
            alt={item.title}
            loading="lazy"
            draggable={false}
            className="block h-full w-auto max-w-none rounded-2xl object-cover pointer-events-none select-none transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Hover overlay hint (center enlarge) */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-black/25 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white shadow-lg">
            <Maximize2 className="h-3.5 w-3.5" />
            <span>Enlarge</span>
          </div>
        </div>

        {/* Contextual Action Button (bottom right) */}
        <a
          href={item.actionHref}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          onClick={(e) => {
            if (!canClick()) {
              e.preventDefault();
              return;
            }
            e.stopPropagation();
          }}
          className={`absolute bottom-4 right-4 z-20 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 group-hover:shadow-xl ${item.colorClass}`}
          aria-label={`${item.actionLabel} for ${item.title}`}
        >
          <span>{item.actionLabel}</span>
          <ArrowUpRight size={14} className="stroke-[2.2]" />
        </a>
      </div>
    </div>
  );
}

interface RainbowRelaxItemProps {
  onSelect: () => void;
  canClick: () => boolean;
}

function RainbowRelaxCarouselItem({ onSelect, canClick }: RainbowRelaxItemProps) {
  return (
    <div className="shrink-0 px-3">
      <div
        onClick={() => {
          if (canClick()) onSelect();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label="Open Rainbow Relax live preview"
        className={`group relative ${CAROUSEL_CARD_HEIGHT} aspect-[1.45] cursor-pointer overflow-hidden rounded-2xl border border-[#ea580c]/30 bg-gradient-to-br from-[#fff7ed] via-[#ffedd5] to-[#fed7aa] shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-[#ea580c] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ea580c]`}
      >
        {/* Concentric rings & aura in Trevor Project orange tones */}
        <div className="relative grid h-full w-full place-items-center overflow-hidden text-[#9a3412] pointer-events-none select-none">
          <div className="absolute size-80 sm:size-96 md:size-[450px] rounded-full border border-[#ea580c]/15" />
          <div className="absolute size-60 sm:size-72 md:size-80 rounded-full border border-[#ea580c]/25" />
          <div className="absolute size-40 sm:size-48 rounded-full border border-[#ea580c]/35" />
          <div className="absolute size-28 sm:size-36 rounded-full bg-[#ff7a00]/40 blur-xl" />

          {/* Top Trevor Project tag */}
          <span className="absolute top-4 left-5 text-[11px] font-bold tracking-[0.2em] uppercase text-[#c2410c]/85">
            The Trevor Project
          </span>

          {/* Center Wind icon & Title */}
          <div className="relative flex flex-col items-center">
            <Wind
              className="size-14 sm:size-16 stroke-[1.2] text-[#c2410c] transition-transform duration-700 group-hover:scale-110"
              aria-hidden="true"
            />
            <span className="mt-2 text-base font-bold text-[#7c2d12]">Rainbow Relax</span>
          </div>

          {/* Bottom breathing caption */}
          <span className="absolute bottom-4 left-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#9a3412]/80">
            Breathe in / breathe out
          </span>

          {/* Corner Live Preview button */}
          <span className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-[#c2410c] px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg transition-transform group-hover:scale-105 pointer-events-auto">
            <span>Live preview</span>
            <ArrowUpRight size={14} className="stroke-[2.2]" />
          </span>
        </div>

        {/* Hover overlay hint */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-[#7c2d12]/30 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-1.5 rounded-full bg-[#c2410c] px-4 py-2 text-xs font-semibold text-white shadow-xl">
            <ArrowUpRight className="h-4 w-4 stroke-[2.2]" />
            <span>Open Live Preview</span>
          </div>
        </div>
      </div>
    </div>
  );
}