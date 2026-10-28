import { useTheme } from '../context/ThemeContext';
import { CornerNav } from './CornerNav.tsx';
import { getLink } from '../data/links';
import { SliderToggle } from './SliderToggle';
import { ArrowLeft } from 'lucide-react';

interface NavbarProps {
  isMessageBoardOpen: boolean;
  onOpenMessageBoard: () => void;
  onCloseMessageBoard: () => void;
}

export function Navbar({ isMessageBoardOpen, onOpenMessageBoard, onCloseMessageBoard }: NavbarProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 mx-auto flex w-full max-w-7xl items-center justify-between border-b border-accent/10 bg-background/85 px-6 py-5 backdrop-blur-md">
      {isMessageBoardOpen ? (
        <button
          type="button"
          onClick={onCloseMessageBoard}
          className="text-left text-sm font-black uppercase tracking-[0.18em] text-primary"
        >
          <span className="inline-flex items-center gap-2">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to portfolio
          </span>
          <span className="ml-2 font-medium tracking-normal text-text/50">/ {theme}</span>
        </button>
      ) : (
        <a href={getLink('home')} className="text-sm font-black uppercase tracking-[0.18em] text-primary">
          memx.tv <span className="ml-2 font-medium tracking-normal text-text/50">/ {theme}</span>
        </a>
      )}

      <nav aria-label="Portfolio controls" className="flex items-center gap-3">
        <SliderToggle selected={theme} onSelect={setTheme} />
        {!isMessageBoardOpen && <CornerNav onOpenMessageBoard={onOpenMessageBoard} />}
      </nav>
    </header>
  );
}
