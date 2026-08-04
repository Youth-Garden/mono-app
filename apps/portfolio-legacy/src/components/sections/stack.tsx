'use client';
import Card3D from '@/components/common/card-3d';
import { STACK_META, TECH_STACK } from '@/constants/stack';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef, useState } from 'react';
import BackgroundGrid from '../common/background-grid';

gsap.registerPlugin(ScrollTrigger);

export default function Stack() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // 3D HUD Initialization Effect
      const cards = gsap.utils.toArray('.stack-card');

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          rotateX: -90, // Start flat
          y: 50,
          z: -100,
          transformOrigin: 'top center', // Flip down from top
        },
        {
          opacity: 1,
          rotateX: 0,
          y: 0,
          z: 0,
          duration: 0.8,
          stagger: 0.05, // Rapid fire sequence
          ease: 'power4.out', // Premium, mechanical feel
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%', // Trigger when section is mostly visible
            toggleActions: 'play none none reverse',
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="stack"
      ref={containerRef}
      className="min-h-screen border-b border-white/10 bg-background snap-start py-20 px-6 md:px-12 relative z-30 shadow-[0_-50px_100px_rgba(0,0,0,0.8)]"
    >
      <BackgroundGrid />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs text-gray-500 uppercase tracking-widest block mb-4">
            {STACK_META.sectionNumber}
          </span>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-4">
            {STACK_META.title}
          </h2>
          <p className="text-sm text-gray-400 uppercase tracking-wider">
            {STACK_META.subtitle}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_STACK.map((category) => (
            <CategoryCard key={category.domain} category={category} />
          ))}
        </div>

        {/* Bottom Stats */}
        {/* Bottom Description */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="max-w-3xl mx-auto md:mx-0 pl-4 border-l-2 border-white/20">
            <p className="text-sm md:text-base text-gray-400 leading-relaxed italic">
              &quot;Technology moves fast; adaptation moves faster. Beyond this
              list, I actively dissect emerging architectures and master tools
              that solve tomorrow&apos;s scalability challenges. My stack
              isn&apos;t just a collection of skills—it represents a mindset of
              continuous evolution and architectural precision.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ category }: { category: (typeof TECH_STACK)[0] }) {
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  const activeItem = activeTech
    ? category.technologies.find((t) => t.name === activeTech)
    : null;

  // Use white if high contrast is forced, otherwise use brand color
  const activeColor = activeItem?.forceHighContrast
    ? '#ffffff'
    : activeItem?.hex === '#000000'
      ? '#ffffff'
      : activeItem?.hex;

  const handleMouseEnter = (techName: string) => {
    setActiveTech(techName);
    setImgError(false); // Reset error state for new item
  };

  const getIconUrl = (tech: {
    name: string;
    slug?: string;
    hex?: string;
    forceHighContrast?: boolean;
  }) => {
    const slug =
      tech.slug ||
      tech.name.toLowerCase().replace(/\./g, '').replace(/\s+/g, '');

    // Use white for high contrast items, otherwise use brand color logic
    const color =
      activeTech === tech.name
        ? tech.forceHighContrast
          ? 'white'
          : tech.hex
            ? tech.hex.replace('#', '')
            : 'gray'
        : 'gray';

    return `https://cdn.simpleicons.org/${slug}/${color}`;
  };

  return (
    <Card3D className="stack-card" maxTilt={8} scale={1.03}>
      <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-8 h-full group transition-all duration-500">
        {/* Static Gradient */}
        <div
          className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-0 group-hover:opacity-100 pointer-events-none z-0 transition-opacity duration-500`}
        />

        {/* Content (Top Layer) */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold uppercase tracking-tight text-white transition-colors duration-300">
                {category.domain}
              </h3>
              {/* Dynamic Icon/Counter Slot */}
              <div
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-black/50 backdrop-blur-md transition-all duration-300"
                style={{
                  borderColor: activeColor || 'rgba(255,255,255,0.1)',
                  transform: activeTech ? 'scale(1.1)' : 'scale(1)',
                  boxShadow: activeColor ? `0 0 15px ${activeColor}20` : '',
                }}
              >
                {activeItem && !imgError ? (
                  <Image
                    src={getIconUrl(activeItem)}
                    alt="Icon"
                    className="w-5 h-5 object-contain"
                    onError={() => setImgError(true)}
                    width={20}
                    height={20}
                  />
                ) : (
                  <span className="text-xs font-mono text-gray-400 group-hover:text-white transition-colors">
                    {category.technologies.length}
                  </span>
                )}
              </div>
            </div>

            <div className="h-px w-full bg-linear-to-r from-white/20 via-white/40 to-white/20 mb-6" />
          </div>

          <div
            className="flex flex-wrap gap-2"
            onMouseLeave={() => setActiveTech(null)}
          >
            {category.technologies.map((tech) => (
              <span
                key={tech.name}
                onMouseEnter={() => handleMouseEnter(tech.name)}
                className={`inline-flex items-center px-3 py-1.5 text-xs font-medium tracking-wide border rounded-full transition-all duration-300 cursor-default hover:scale-105 ${
                  activeTech === tech.name
                    ? tech.forceHighContrast
                      ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                      : 'bg-white/10 text-white' // Fallback for standard active state (colors handled by style)
                    : tech.forceHighContrast
                      ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white hover:text-black hover:border-white'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/30 hover:text-white'
                }`}
                style={
                  !tech.forceHighContrast &&
                  activeTech === tech.name &&
                  tech.hex
                    ? {
                        borderColor: tech.hex,
                        backgroundColor: `${tech.hex}15`,
                        color: tech.hex,
                        boxShadow: `0 0 15px ${tech.hex}30`,
                      }
                    : {}
                }
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card3D>
  );
}
