import { useRef, useState } from 'react';
import type { UIEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Project, Identity } from '../types/portfolio';
import { ProjectCard } from './ProjectCard';

interface CardCarouselProps {
  projects: Project[];
  mode: Identity;
}

export function CardCarousel({ projects, mode }: CardCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const visibleProjects = projects.filter((project) => project[mode]);

  const updateControls = (event: UIEvent<HTMLDivElement>) => {
    const track = event.currentTarget;
    setCanScrollLeft(track.scrollLeft > 2);
    setCanScrollRight(track.scrollLeft + track.clientWidth < track.scrollWidth - 2);
  };

  const scroll = (direction: -1 | 1) => {
    trackRef.current?.scrollBy({
      left: direction * (trackRef.current.clientWidth * 0.82),
      behavior: 'smooth',
    });
  };

  return (
    <section id="projects" className="scroll-mt-24" aria-labelledby="projects-title">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Selected work / 0{visibleProjects.length}
          </p>
          <h2 id="projects-title" className="text-3xl font-bold text-primary md:text-5xl">
            {mode === 'engineer' ? 'Built with intent.' : 'Made by hand.'}
          </h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            aria-label="Scroll projects left"
            disabled={!canScrollLeft}
            onClick={() => scroll(-1)}
            className="grid size-11 place-items-center rounded-full border border-accent/30 text-text transition hover:border-accent hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Scroll projects right"
            disabled={!canScrollRight}
            onClick={() => scroll(1)}
            className="grid size-11 place-items-center rounded-full border border-accent/30 text-text transition hover:border-accent hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {visibleProjects.length > 0 ? (
        <div
          ref={trackRef}
          onScroll={updateControls}
          className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="h-[430px] w-[min(84vw,370px)] shrink-0 snap-start"
            >
              <ProjectCard project={project} mode={mode} />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="border-t border-accent/20 py-8 text-text/60">More work is on the way.</p>
      )}
    </section>
  );
}