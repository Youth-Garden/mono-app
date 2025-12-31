import { ReactQueryProvider } from '@/components/providers/query-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Using Inter as professional default
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DevStudio - Universal Playground',
  description: 'A futuristic online code editor.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-black text-white`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
