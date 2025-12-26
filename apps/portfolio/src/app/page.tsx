import Experience from '@/components/sections/experience';
import Hero from '@/components/sections/hero';
import Philosophy from '@/components/sections/philosophy';
import Rewards from '@/components/sections/rewards'; // Keep Experience/Rewards static for scroll smoothness
import dynamic from 'next/dynamic';

const Contact = dynamic(() => import('@/components/sections/contact'));
const Recognition = dynamic(() => import('@/components/sections/recognition'));
const Stack = dynamic(() => import('@/components/sections/stack'));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground selection:bg-white selection:text-black relative z-1">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '100px 100px',
          }}
        />
      </div>
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
