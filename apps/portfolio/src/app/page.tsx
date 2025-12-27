import BackgroundGrid from '@/components/common/background-grid';
import Hero from '@/components/sections/hero';
import Philosophy from '@/components/sections/philosophy';
import dynamic from 'next/dynamic';

const Contact = dynamic(() => import('@/components/sections/contact'));
const Recognition = dynamic(() => import('@/components/sections/recognition'));
const Stack = dynamic(() => import('@/components/sections/stack'));
const Rewards = dynamic(() => import('@/components/sections/rewards'));
const Experience = dynamic(() => import('@/components/sections/experience'));

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
