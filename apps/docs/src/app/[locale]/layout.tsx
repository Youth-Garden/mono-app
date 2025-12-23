import { RootProvider } from 'fumadocs-ui/provider';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Scroll Trigger',
    default: 'Scroll Trigger',
  },
  description: 'Comprehensive documentation for Scroll Trigger.',
  metadataBase: new URL('https://scroll-trigger.com'), // Replace with actual domain
  openGraph: {
    title: 'Scroll Trigger',
    description: 'Comprehensive documentation for Scroll Trigger.',
    url: 'https://scroll-trigger.com',
    siteName: 'Scroll Trigger',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scroll Trigger',
    description: 'Comprehensive documentation for Scroll Trigger.',
    creator: '@scroll_trigger',
  },
};

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-black text-white">
        <NextIntlClientProvider messages={messages}>
          <RootProvider>{children}</RootProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
