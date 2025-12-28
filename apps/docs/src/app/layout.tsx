import { RootProvider } from 'fumadocs-ui/provider';
import 'fumadocs-ui/style.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Scroll Trigger',
    default: 'Scroll Trigger',
  },
  description: 'Comprehensive documentation for Scroll Trigger.',
  metadataBase: new URL('https://scroll-trigger.com'),
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen relative flex flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
