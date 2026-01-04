import { createContext } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { cn } from '../lib';
import {
  isEmbedded,
  theme as themeSignal,
  toggleTheme as toggleThemeAction,
} from '../store';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: preact.ComponentChildren;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(themeSignal.value);

  useEffect(() => {
    // Subscribe to theme signal changes
    const unsubscribe = themeSignal.subscribe((newTheme) => {
      setTheme(newTheme);
    });
    return unsubscribe;
  }, []);

  const value: ThemeContextValue = {
    theme,
    toggleTheme: toggleThemeAction,
  };

  return (
    <ThemeContext.Provider value={value}>
      <div
        className={cn(
          'spectre-theme chat-font-sans chat-antialiased',
          theme === 'dark' && 'dark',
          isEmbedded.value && 'chat-w-full chat-h-full'
        )}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
