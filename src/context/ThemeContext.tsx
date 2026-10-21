import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'artist' | 'engineer';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getSavedTheme = (): Theme => {
  try {
    const saved = localStorage.getItem('portfolio-theme');
    return saved === 'artist' || saved === 'engineer' ? saved : 'engineer';
  } catch (error) {
    console.warn('Unable to read the saved theme from local storage.', error);
    return 'engineer';
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getSavedTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch (error) {
      console.warn('Unable to save the theme to local storage.', error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'artist' ? 'engineer' : 'artist'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
