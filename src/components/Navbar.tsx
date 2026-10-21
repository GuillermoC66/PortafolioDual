import { useTheme } from '../context/ThemeContext';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="w-full max-w-5xl mx-auto flex items-center justify-between p-6">
      <div className="text-xl font-bold text-primary uppercase tracking-widest">
        {theme === 'artist' ? 'Artistic' : 'Engineer'}
      </div>
      
      <div className="flex items-center gap-6">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg border border-accent text-accent hover:bg-accent hover:text-background transition-colors font-medium text-sm"
        >
          Switch to {theme === 'artist' ? 'Engineer' : 'Artist'}
        </button>
      </div>
    </nav>
  );
}
