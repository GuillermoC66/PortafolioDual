import { useTheme } from '../context/ThemeContext';
import { CornerNav } from './CornerNav.tsx';
import { getLink } from '../data/links';
import { SliderToggle } from './SliderToggle';

export function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 mx-auto flex w-full max-w-7xl items-center justify-between border-b border-accent/10 bg-background/85 px-6 py-5 backdrop-blur-md">
      <a href={getLink('home')} className="text-sm font-black uppercase tracking-[0.18em] text-primary">
        memx.tv <span className="ml-2 font-medium tracking-normal text-text/50">/ {theme}</span>
      </a>

      <nav aria-label="Portfolio controls" className="flex items-center gap-3">
        <SliderToggle selected={theme} onSelect={setTheme} />
        <CornerNav />
      </nav>
    </header>
  );
}
