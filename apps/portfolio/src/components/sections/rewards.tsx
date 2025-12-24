'use client';
import SectionHeader from '@/components/common/section-header';
import { REWARDS, REWARDS_META } from '@/constants/rewards';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Rewards() {
  const containerRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray('.reward-row');

      items.forEach((item) => {
        const element = item as HTMLElement;
        const ghostText = element.querySelector('.ghost-text');

        // Cinematic Ghost Text Parallax (Vertical/Subtle)
        if (ghostText) {
          gsap.fromTo(
            ghostText,
            { yPercent: 10 },
            {
              yPercent: -10,
              ease: 'none',
              scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
              },
            }
          );
        }

        // Entrance Stagger (Clean)
        const staggerElements = element.querySelectorAll('.stagger-item');
        if (staggerElements.length > 0) {
          gsap.from(staggerElements, {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      });

      // Momentum Drift based on velocity
      ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          gsap.to('.reward-item-inner', {
            y: velocity * 0.012,
            duration: 0.6,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="rewards"
      ref={containerRef}
      className="w-full border-t border-white/10 bg-background relative"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 relative">
        {/* Pinned Left Side */}
        <div className="md:col-span-3 border-r border-white/10 p-6 md:p-12 md:h-screen md:sticky top-0 flex flex-col justify-between z-20 bg-background">
          <SectionHeader
            sectionNumber={REWARDS_META.sectionNumber}
            title={REWARDS_META.title}
            scrollHint={REWARDS_META.scrollHint}
            progressBarRef={progressBarRef}
          />
        </div>

        {/* Scrollable Right Side */}
        <div className="md:col-span-9">
          {REWARDS.map((project, index) => (
            <div
              key={index}
              className="reward-row group min-h-screen flex flex-col justify-center p-6 md:p-12 border-b border-white/10 last:border-b-0 relative overflow-hidden"
            >
              <div className="ghost-text absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-black uppercase text-white/[0.02] select-none pointer-events-none whitespace-nowrap z-0 italic w-full text-center tracking-tighter">
                {project.title}
              </div>

              <div className="reward-item-inner max-w-4xl relative z-10 w-full">
                <div className="flex items-center justify-between mb-10 stagger-item">
                  <span className="reward-category text-xs font-mono text-gray-500 tracking-[0.2em] uppercase bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    {project.category}
                  </span>

                  <a
                    href={project.link}
                    className="reward-link w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                  >
                    <ArrowUpRight className="w-6 h-6" />
                  </a>
                </div>

                <h3 className="reward-title text-5xl md:text-8xl font-bold uppercase mb-8 text-white tracking-tighter leading-none stagger-item">
                  {project.title}
                </h3>

                <div className="reward-role relative mb-10 pl-6 stagger-item">
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/40 via-white/20 to-transparent rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)]"></div>
                  <span className="text-2xl md:text-4xl font-mono text-white/90 tracking-tight uppercase leading-none block">
                    {project.role}
                  </span>
                </div>

                <p className="reward-description text-base md:text-xl text-gray-400 leading-relaxed mb-10 font-light max-w-2xl stagger-item">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 md:gap-3 stagger-item">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="reward-tech-tag text-[10px] md:text-xs uppercase tracking-[0.2em] px-5 py-3 border border-white/5 rounded-sm text-gray-500 hover:border-white/40 hover:text-white hover:bg-white/5 transition-all duration-300 cursor-default font-mono bg-white/[0.02]"
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
