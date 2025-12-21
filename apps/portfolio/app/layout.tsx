import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-gt-america', // Mapping to the variable expected by Tailwind config
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Quan Tran | Creative Developer',
  description: 'Web3 & Full-Stack Architecture',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} font-sans bg-background text-foreground antialiased selection:bg-white selection:text-black`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
