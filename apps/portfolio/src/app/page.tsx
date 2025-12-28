import BackgroundGrid from '@/components/common/background-grid';
import Experience from '@/components/sections/experience';
import Hero from '@/components/sections/hero';
import Philosophy from '@/components/sections/philosophy';
import Rewards from '@/components/sections/rewards';
import dynamic from 'next/dynamic';

const Contact = dynamic(() => import('@/components/sections/contact'));
const Recognition = dynamic(() => import('@/components/sections/recognition'));
const Stack = dynamic(() => import('@/components/sections/stack'));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground selection:bg-white selection:text-black relative z-1">
      <BackgroundGrid />

      <Hero />
      <Philosophy />
      <Experience />
      <Rewards />
      <Stack />
      <Recognition />
      <Contact />
    </main>
  );
}
