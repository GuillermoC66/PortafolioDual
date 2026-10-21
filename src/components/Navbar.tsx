import { useTheme } from '../context/ThemeContext';
import { CornerNav } from './CornerNav.tsx';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 mx-auto flex w-full max-w-7xl items-center justify-between border-b border-accent/10 bg-background/85 px-6 py-5 backdrop-blur-md">
      <a href="#home" className="text-sm font-black uppercase tracking-[0.18em] text-primary">
        memx.tv <span className="ml-2 font-medium tracking-normal text-text/50">/ {theme}</span>
      </a>

      <nav aria-label="Portfolio controls" className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'artist' ? 'engineer' : 'artist'} mode`}
          className="rounded-full border border-accent/30 px-4 py-2 text-xs font-semibold capitalize text-text transition-colors hover:border-accent hover:bg-accent/10 sm:text-sm"
        >
          View {theme === 'artist' ? 'engineer' : 'artist'} side
        </button>
        <CornerNav />
      </nav>
    </header>
  );
}
