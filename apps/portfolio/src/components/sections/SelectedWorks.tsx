'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '01',
    title: 'HUNNYPLAY',
    category: 'GameFi / High-Volume Platform',
    role: 'Core Architecture & Optimization',
    description:
      'Engineered the frontend architecture for a high-traffic decentralized iGaming platform. Optimized RTP (Return to Player) algorithms for titles like Plinko and Dice. Result: Reduced load times by 40% and handled 10k+ concurrent socket connections.',
    tech: ['Next.js', 'Web3.js', 'Socket.io'],
    link: '#',
  },
  {
    id: '02',
    title: 'CHONCC HUB',
    category: 'Infrastructure / Cedra Network',
    role: 'Protocol Developer',
    description:
      'A decentralized Game Hub built on the Cedra Network. Developed a custodial wallet system and a custom indexer to track on-chain game states efficiently. Result: Seamless "Web2-like" onboarding for Web3 gamers.',
    tech: ['Aptos Move', 'Rust', 'Indexer'],
    link: '#',
  },
  {
    id: '03',
    title: 'SPECTRE',
    category: 'Open Source / Monorepo Tooling',
    role: 'Library Author',
    description:
      'A lightweight (3kb), framework-agnostic chat widget designed for high-performance marketing sites. Features an event-driven architecture and complete style isolation via Shadow DOM. Vibe: "Invisible until needed."',
    tech: ['Turborepo', 'Preact', 'Shadow DOM'],
    link: '#',
  },
];

export default function SelectedWorks() {
  const containerRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: leftRef.current,
        pinSpacing: false,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full flex flex-col md:flex-row border-b border-white/10"
    >
      {/* Pinned Left Side */}
      <div
        className="w-full md:w-1/3 border-r border-white/10 md:h-screen md:sticky top-0 p-6 md:p-12 flex flex-col justify-between bg-background z-10"
        ref={leftRef}
      >
        <div>
          <span className="text-xs text-gray-500 uppercase tracking-widest block mb-4">
            01 / Selected Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">
            Case <br /> Studies
          </h2>
        </div>
        <div className="hidden md:block">
          <span className="text-xs text-[#888]">[ SCROLL TO NAVIGATE ]</span>
          <div className="w-full h-[1px] bg-white/10 mt-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1/3 bg-white animate-scroll-bar"></div>
          </div>
        </div>
      </div>

      {/* Scrollable Right Side */}
      <div ref={rightRef} className="w-full md:w-2/3">
        {projects.map((project, index) => (
          <div
            key={index}
            className="min-h-screen border-b border-white/10 p-6 md:p-12 flex flex-col justify-center transition-colors hover:bg-white/5 group"
          >
            <div className="max-w-xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-mono px-2 py-1 border border-white/20 rounded-full text-white/60">
                  {project.category}
                </span>
              </div>

              <h3 className="text-4xl md:text-6xl font-bold uppercase mb-2 tracking-tight group-hover:text-transparent group-hover:stroke-white transition-all duration-300">
                {project.title}
              </h3>

              <div className="flex items-center gap-2 mb-8 text-sm text-[#888]">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>{project.role}</span>
              </div>

              <p className="text-lg text-white/80 leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-12">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs uppercase tracking-wider text-[#666] border border-white/5 px-3 py-1 bg-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={project.link}
                className="inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:gap-4 transition-all duration-300 hover:text-green-400"
              >
                View Project <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
