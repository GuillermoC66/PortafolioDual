import { Code2, Palette } from 'lucide-react';
import { motion } from 'motion/react';
import type { Theme } from '../context/ThemeContext';

interface SliderToggleProps {
  selected: Theme;
  onSelect: (theme: Theme) => void;
}

const OPTIONS: { theme: Theme; label: string; Icon: typeof Code2 }[] = [
  { theme: 'engineer', label: 'Engineer', Icon: Code2 },
  { theme: 'artist', label: 'Artist', Icon: Palette },
];

export function SliderToggle({ selected, onSelect }: SliderToggleProps) {
  return (
    <div
      role="group"
      aria-label="Portfolio mode"
      className="relative flex items-center rounded-full border border-accent/30 bg-background/60 p-1"
    >
      {OPTIONS.map(({ theme, label, Icon }) => {
        const isSelected = selected === theme;

        return (
          <button
            key={theme}
            type="button"
            aria-label={`Switch to ${label.toLowerCase()} mode`}
            aria-pressed={isSelected}
            onClick={() => onSelect(theme)}
            className={`relative z-10 inline-flex min-h-9 items-center justify-center gap-2 rounded-full px-3 text-xs font-semibold transition-colors sm:px-4 sm:text-sm ${
              isSelected ? 'text-background' : 'text-text/70 hover:text-text'
            }`}
          >
            {isSelected && (
              <motion.span
                layoutId="active-portfolio-mode"
                className="absolute inset-0 -z-10 rounded-full bg-primary"
                transition={{ type: 'spring', damping: 18, stiffness: 260 }}
              />
            )}
            <Icon size={16} aria-hidden="true" />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
