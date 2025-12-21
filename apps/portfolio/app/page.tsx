import Hero from "@/components/sections/Hero";
import TechnicalWork from "@/components/sections/TechnicalWork";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <TechnicalWork />
      
      {/* Spacer for scrolling */}
      <div className="h-screen w-full flex items-center justify-center border-t border-white/10">
        <p className="text-gray-500 uppercase tracking-widest text-xs">Footer / Contact</p>
      </div>
    </main>
  );
}
