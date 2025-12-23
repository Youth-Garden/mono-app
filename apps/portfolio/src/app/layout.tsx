import ClientLayout from '@/components/client-layout';
import SmoothScroll from '@/components/smooth-scroll';
import type { Metadata } from 'next';
import { Outfit, Playfair_Display } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-gt-america', // Mapping to the variable expected by Tailwind config
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'QUAN TRAN | Full Stack Architecture',
  description:
    'Building high-performance decentralized systems and scalable web protocols.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'QUAN TRAN | Full Stack Architecture',
    description:
      'Building high-performance decentralized systems and scalable web protocols.',
    images: ['/me.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QUAN TRAN | Full Stack Architecture',
    description:
      'Building high-performance decentralized systems and scalable web protocols.',
    images: ['/me.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${playfair.variable} font-sans bg-background text-foreground antialiased selection:bg-white selection:text-black`}
      >
        <ClientLayout>
          <SmoothScroll>{children}</SmoothScroll>
        </ClientLayout>
      </body>
    </html>
  );
}
