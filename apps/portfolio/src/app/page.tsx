import Contact from '@/components/sections/Contact';
import Hero from '@/components/sections/hero';
import Philosophy from '@/components/sections/Philosophy';
import SelectedWorks from '@/components/sections/SelectedWorks';
import Stack from '@/components/sections/Stack';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground selection:bg-white selection:text-black">
      <Hero />
      <Philosophy />
      <SelectedWorks />
      <Stack />
      <Contact />
    </main>
  );
}
