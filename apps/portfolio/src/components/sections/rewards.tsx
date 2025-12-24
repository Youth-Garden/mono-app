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
    title: 'ancient8-jam',
    category: '1st Place / Consumer App',
    role: 'lead-developer',
    description:
      'Architecting a decentralized consumer application that leverages zero-knowledge proofs for privacy-preserving interactions. Integrated Next.js with Ancient8 Layer 2 to deliver sub-second transaction confirmations and seamless user onboarding experiences through account abstraction.',
    tech: ['Next.js', 'Ancient8', 'Smart Contracts'],
    link: '#',
    image: '/rewards/builder-jam/reward-1.jpg',
  },
  {
    id: '02',
    title: 'cardano-hack',
    category: '2nd Place / Blockchain',
    role: 'full-stack-engineer',
    description:
      'Pioneering a novel DeFi protocol on Cardano utilizing Plutus smart contracts to enable trustless peer-to-peer lending. Implemented off-chain governance mechanisms and a highly responsive frontend interface demonstrating complex UTXO model interactions.',
    tech: ['Haskell', 'Plutus', 'React'],
    link: '#',
    image: '/rewards/cardano/cardano_runner-up.jpg',
  },
  {
    id: '03',
    title: 'polkadot-ui',
    category: 'Best UI/UX Award',
    role: 'ui-architect',
    description:
      'Crafting an award-winning user interface for the Polkadot ecosystem. Focusing on accessibility and reducing cognitive load for users navigating cross-chain bridges and staking dashboards. Utilizing advanced Framer Motion animations for fluid state transitions.',
    tech: ['Polkadot.js', 'Framer Motion', 'Tailwind'],
    link: '#',
    image: '/rewards/reward-2.jpg',
  },
];

export default function Rewards() {
  const containerRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          if (progressBarRef.current) {
            gsap.to(progressBarRef.current, {
              width: `${self.progress * 100}%`,
              duration: 0.1,
              ease: 'none',
            });
          }
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="rewards"
      ref={containerRef}
      className="w-full border-b border-white/10 bg-background relative"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 relative">
        {/* Pinned Left Side */}
        <div className="md:col-span-3 border-r border-white/10 p-6 md:p-12 md:h-screen md:sticky top-0 flex flex-col justify-between z-10 bg-background">
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-widest block mb-4">
              02 / Rewards
            </span>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">
              Rewards <br /> & Awards
            </h2>
          </div>
          <div className="hidden md:block">
            <span className="text-xs text-[#888]">[ SCROLL TO NAVIGATE ]</span>
            <div className="w-full h-[1px] bg-white/10 mt-4 relative overflow-hidden">
              <div
                ref={progressBarRef}
                className="absolute top-0 left-0 h-full bg-white w-0"
              ></div>
            </div>
          </div>
        </div>

        {/* Scrollable Right Side */}
        <div className="md:col-span-9">
          {projects.map((project, index) => (
            <div
              key={index}
              className="reward-row group min-h-screen flex flex-col justify-center p-6 md:p-12 border-b border-white/10 last:border-b-0 relative overflow-hidden snap-start"
            >
              <div className="max-w-3xl relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <span className="reward-category text-sm font-mono text-gray-500 tracking-wider">
                    {project.category}
                  </span>

                  <a
                    href={project.link}
                    className="reward-link w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40"
                  >
                    <ArrowUpRight className="w-6 h-6" />
                  </a>
                </div>

                <h3 className="reward-title text-5xl md:text-7xl font-bold uppercase mb-6 text-white tracking-tighter leading-none">
                  {project.title}
                </h3>

                <div className="reward-role relative mb-8 pl-4">
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/40 via-white/20 to-transparent"></div>
                  <span className="text-xl font-mono text-white/70 tracking-wide">
                    {project.role}
                  </span>
                </div>

                <p className="reward-description text-lg text-gray-400 leading-relaxed mb-10 font-light max-w-2xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="reward-tech-tag text-xs uppercase tracking-wider px-4 py-2 border border-white/10 rounded-full text-gray-500 cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
