import { createContext } from 'preact';
import { useContext, useEffect, useRef, useState } from 'preact/hooks';
import { cn } from '../lib';
import { hexToRgb } from '../lib/colors';
import {
  colors,
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Subscribe to theme signal changes
    const unsubscribe = themeSignal.subscribe((newTheme) => {
      setTheme(newTheme);
    });
    return unsubscribe;
  }, []);

  // Sync colors
  useEffect(() => {
    const applyColors = () => {
      const el = containerRef.current;
      const currentColors = colors.value;
      if (!el || !currentColors) return;

      if (currentColors.primary) {
        const rgb = hexToRgb(currentColors.primary);
        if (rgb) {
          el.style.setProperty('--chat-primary', `${rgb.r} ${rgb.g} ${rgb.b}`);
        }
      }

      if (currentColors.primaryForeground) {
        const rgb = hexToRgb(currentColors.primaryForeground);
        if (rgb) {
          el.style.setProperty(
            '--chat-primary-foreground',
            `${rgb.r} ${rgb.g} ${rgb.b}`
          );
        }
      }
    };

    // Apply on mount and when colors signal changes
    const unsubscribe = colors.subscribe(applyColors);
    return unsubscribe;
  }, []);

  const value: ThemeContextValue = {
    theme,
    toggleTheme: toggleThemeAction,
  };

  return (
    <ThemeContext.Provider value={value}>
      <div
        ref={containerRef}
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
