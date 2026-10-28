import { ArrowUpRight } from 'lucide-react';
import { getLink, type LinkId } from '../data/links';

const CURRENT_YEAR = new Date().getFullYear();

const PAGE_LINKS = [
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

interface FooterProps {
  name: string;
  onOpenMessageBoard: () => void;
}

export function Footer({ name, onOpenMessageBoard }: FooterProps) {
  return (
    <footer className="mt-8 border-t border-accent/15 px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-3 text-sm text-text/50">
          <p>© {CURRENT_YEAR} {name}</p>
          <p className="text-base font-medium text-text">Made with both sides of my brain.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-12">
          <nav aria-label="Page links" className="flex flex-col items-start gap-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Explore</h2>
            {PAGE_LINKS.map((link) => (
              <a
                key={link.label}
                href={getLink(link.href)}
                className="text-sm font-medium text-text/70 transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={onOpenMessageBoard}
              className="text-sm font-medium text-text/70 transition-colors hover:text-primary"
            >
              Guestbook
            </button>
          </nav>
          <nav aria-label="Social links" className="flex flex-col items-start gap-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Social</h2>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={getLink(link.href)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-text/70 transition-colors hover:text-primary"
              >
                {link.label}
                <ArrowUpRight
                  size={14}
                  aria-hidden="true"
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}