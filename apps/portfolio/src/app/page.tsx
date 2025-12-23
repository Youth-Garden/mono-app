import Certifications from '@/components/sections/certifications';
import Contact from '@/components/sections/contact';
import Experience from '@/components/sections/experience';
import Hero from '@/components/sections/hero';
import Philosophy from '@/components/sections/philosophy';
import Rewards from '@/components/sections/rewards';
import Stack from '@/components/sections/stack';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground selection:bg-white selection:text-black scroll-smooth">
      <Hero />
      <Philosophy />
      <Experience />
      <Rewards />
      <Stack />
      <Certifications />
      <Contact />
    </main>
  );
}
