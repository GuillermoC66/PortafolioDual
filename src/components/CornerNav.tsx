import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Practice', href: '#practice' },
  { label: 'Selected work', href: '#projects' },
];

export function CornerNav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="relative z-50 grid size-11 place-items-center rounded-full border border-accent/30 text-text transition hover:border-accent hover:bg-accent/10"
      >
        {isOpen ? <X size={19} /> : <Menu size={19} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-background/95 px-8 backdrop-blur-xl sm:px-16"
          >
            <p className="absolute left-8 top-8 text-xs font-bold uppercase tracking-[0.2em] text-accent sm:left-16 sm:top-10">
              Portfolio / {CURRENT_YEAR}
            </p>
            <nav aria-label="Main navigation" className="mx-auto w-full max-w-5xl">
              {LINKS.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * index, duration: 0.35 }}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center justify-between border-b border-accent/20 py-3 text-4xl font-semibold text-text transition-colors hover:text-primary sm:py-4 sm:text-6xl"
                >
                  {link.label}
                  <ArrowUpRight className="size-6 text-accent opacity-0 transition group-hover:opacity-100 sm:size-8" />
                </motion.a>
              ))}
            </nav>
            <p className="absolute bottom-8 left-8 text-sm text-text/50 sm:bottom-10 sm:left-16">
              Art, engineering, and everything in between.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}