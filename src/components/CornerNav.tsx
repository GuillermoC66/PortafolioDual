import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { getLink, type LinkId } from '../data/links';

const CURRENT_YEAR = new Date().getFullYear();

const LINKS = [
  { label: 'Home', href: 'home' },
  { label: 'About', href: 'about' },
  { label: 'How I Work', href: 'practice' },
  { label: 'Contact', href: 'contact' },
] satisfies { label: string; href: LinkId }[];

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'githubProfile' },
  { label: 'Instagram', href: 'instagramProfile' },
  { label: 'LinkedIn', href: 'linkedinProfile' },
] satisfies { label: string; href: LinkId }[];

interface CornerNavProps {
  onOpenMessageBoard: () => void;
}

export function CornerNav({ onOpenMessageBoard }: CornerNavProps) {
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

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
              exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[60] flex flex-col justify-center bg-background/95 px-8 backdrop-blur-xl sm:px-16"
            >
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setIsOpen(false)}
                className="absolute right-6 top-5 grid size-11 place-items-center rounded-full border border-accent/30 text-text transition hover:border-accent hover:bg-accent/10"
              >
                <X size={19} aria-hidden="true" />
              </button>
              <p className="absolute left-8 top-8 text-xs font-bold uppercase tracking-[0.2em] text-accent sm:left-16 sm:top-10">
                Portfolio / {CURRENT_YEAR}
              </p>
              <nav aria-label="Main navigation" className="mx-auto w-full max-w-5xl">
                {LINKS.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={getLink(link.href)}
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
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * LINKS.length, duration: 0.35 }}
                  onClick={() => {
                    setIsOpen(false);
                    onOpenMessageBoard();
                  }}
                  className="group flex w-full items-center justify-between border-b border-accent/20 py-3 text-left text-4xl font-semibold text-text transition-colors hover:text-primary sm:py-4 sm:text-6xl"
                >
                  Guestbook
                  <ArrowUpRight className="size-6 text-accent opacity-0 transition group-hover:opacity-100 sm:size-8" />
                </motion.button>
              </nav>
              <div className="mx-auto mt-8 flex w-full max-w-5xl flex-col items-start gap-3 border-t border-accent/20 pt-5">
                {SOCIAL_LINKS.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={getLink(link.href)}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + index * 0.08, duration: 0.35 }}
                    className="group inline-flex items-center gap-2 text-base font-medium text-text/70 transition-colors hover:text-primary sm:text-lg"
                  >
                    {link.label}
                    <ArrowUpRight className="size-4 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </motion.a>
                ))}
              </div>
              <p className="absolute bottom-8 left-8 text-sm text-text/50 sm:bottom-10 sm:left-16">
                Art, engineering, and everything in between.
              </p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}