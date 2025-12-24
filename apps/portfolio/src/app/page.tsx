import Contact from '@/components/sections/contact';
import Experience from '@/components/sections/experience';
import Hero from '@/components/sections/hero';
import Philosophy from '@/components/sections/philosophy';
import Recognition from '@/components/sections/recognition';
import Rewards from '@/components/sections/rewards';
import Stack from '@/components/sections/stack';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground selection:bg-white selection:text-black relative">
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
