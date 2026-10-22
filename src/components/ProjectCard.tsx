import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, ExternalLink, Wind, X } from 'lucide-react';
import type { Project } from '../types/portfolio';
import { getLink } from '../data/links';

interface ProjectCardProps {
  project: Project;
  mode: 'artist' | 'engineer';
}

export function ProjectCard({ project, mode }: ProjectCardProps) {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  useEffect(() => {
    if (!isDemoOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsDemoOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isDemoOpen]);

  const content = project[mode];
  if (!content) return null;
  const imageUrl = content.image ? getLink(content.image) : undefined;
  const demoUrl = content.demoUrl ? getLink(content.demoUrl) : undefined;
  const repoUrl = content.repoUrl ? getLink(content.repoUrl) : undefined;
  const isVideo = imageUrl?.split(/[?#]/, 1)[0].toLowerCase().endsWith('.mp4') ?? false;
  const cardClassName = 'group flex h-full flex-col overflow-hidden rounded-xl border border-accent/20 bg-background shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl';
  const cardContent = (
    <>
      <div className="relative block aspect-[1.45] w-full shrink-0 overflow-hidden bg-accent/10 text-left">
        {imageUrl ? isVideo ? (
          <video
            src={imageUrl}
            aria-label={`${content.title} video`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <img
            src={imageUrl}
            alt={content.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="relative grid h-full place-items-center overflow-hidden bg-[#c9f0df] text-[#145a47]">
            <div className="absolute size-56 rounded-full border border-[#145a47]/10 sm:size-64" />
            <div className="absolute size-40 rounded-full border border-[#145a47]/15 sm:size-48" />
            <div className="absolute size-24 rounded-full bg-[#78d5ad]/50 blur-xl sm:size-32" />
            <Wind className="relative size-16 stroke-[1.15]" aria-hidden="true" />
            <span className="absolute bottom-5 left-5 text-xs font-bold uppercase tracking-[0.2em]">
              Breathe in / breathe out
            </span>
          </div>
        )}
        {demoUrl && (
          <span className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-[#123d32] px-4 py-2 text-xs font-semibold text-white shadow-lg transition-transform group-hover:scale-105">
            Open live preview <ArrowUpRight size={15} />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="mb-2 text-2xl font-bold text-primary">{content.title}</h3>
        <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-text/75">
          {content.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-2">
          {content.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
        {repoUrl && (
          <span className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent transition-colors group-hover:text-primary">
            View repository <ExternalLink size={15} aria-hidden="true" />
          </span>
        )}
      </div>
    </>
  );

  return (
    <>
      {repoUrl ? (
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${content.title} repository in a new tab`}
          className="block h-full rounded-xl cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <article className={cardClassName}>{cardContent}</article>
        </a>
      ) : (
        <article
          className={`${cardClassName} ${demoUrl ? 'cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent' : ''}`}
          role={demoUrl ? 'button' : undefined}
          tabIndex={demoUrl ? 0 : undefined}
          aria-label={demoUrl ? `Open ${content.title} live preview` : undefined}
          onClick={() => demoUrl && setIsDemoOpen(true)}
          onKeyDown={(event) => {
            if (demoUrl && (event.key === 'Enter' || event.key === ' ')) {
              event.preventDefault();
              setIsDemoOpen(true);
            }
          }}
        >
          {cardContent}
        </article>
      )}

      <AnimatePresence>
        {isDemoOpen && demoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-3 backdrop-blur-sm sm:p-6"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setIsDemoOpen(false);
            }}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-label={`${content.title} live preview`}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="flex h-[min(88vh,820px)] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-background shadow-2xl"
            >
              <header className="flex shrink-0 items-center justify-between gap-4 border-b border-accent/15 px-4 py-3 sm:px-6">
                <div>
                  <h2 className="font-semibold text-primary">{content.title}</h2>
                  <p className="text-xs text-text/55">Live project preview</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-accent/25 px-3 py-2 text-xs font-semibold text-text transition hover:bg-accent/10 sm:px-4"
                  >
                    <span className="hidden sm:inline">Open in new tab</span>
                    <ExternalLink size={15} />
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsDemoOpen(false)}
                    aria-label="Close preview"
                    className="grid size-9 place-items-center rounded-full border border-accent/25 text-text transition hover:bg-accent/10"
                  >
                    <X size={17} />
                  </button>
                </div>
              </header>
              <iframe
                src={demoUrl}
                title={`${content.title} website`}
                className="min-h-0 flex-1 border-0 bg-white"
                allow="fullscreen"
                allowFullScreen
              />
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
