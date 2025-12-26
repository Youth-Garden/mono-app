'use client';
import SectionHeader from '@/components/common/section-header';
import { ALL_EXPERIENCE_ITEMS, EXPERIENCE_META } from '@/constants/experience';
import { useHorizontalScroll } from '@/hooks/use-horizontal-scroll';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2 } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const { trackRef, progressBarRef } = useHorizontalScroll({
    containerRef,
    itemCount: ALL_EXPERIENCE_ITEMS.length,
  });

  // Removed velocity-based distortion hooks to fix "wavy" effect as requested

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      // 1. Reset ghost text positions on refresh
      ScrollTrigger.addEventListener('refreshInit', () => {
        gsap.set('.ghost-text', { x: 0, xPercent: 0 });
      });

      // 2. Main horizontal scroll timeline
      const scrollTween = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => {
            const trackWidth = track.scrollWidth;
            const viewportWidth =
              window.innerWidth < 768
                ? window.innerWidth
                : window.innerWidth * 0.75;
            return `+=${trackWidth - viewportWidth}`;
          },
          scrub: true, // Let Lenis handle the inertia
          invalidateOnRefresh: true,
        },
      });

      const items = gsap.utils.toArray('.exp-row');

      items.forEach((item) => {
        const element = item as HTMLElement;
        const ghostText = element.querySelector('.ghost-text');
        const content = element.querySelector('.exp-content-wrapper');

        // Content is always visible
        if (content) {
          gsap.set(content.children, { opacity: 1, y: 0 });
        }

        // Cinematic Ghost Text Parallax
        if (ghostText) {
          gsap.to(ghostText, {
            xPercent: -15,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              containerAnimation: scrollTween,
              start: 'left right',
              end: 'right left',
              scrub: 0.5,
            },
          });
        }
      });

      // 3. Momentum Feel (Drift based on velocity)
      ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          gsap.to('.exp-item-inner', {
            x: velocity * 0.015, // Reduced slightly for better stability
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
      id="experience"
      ref={containerRef}
      className="w-full bg-background relative h-screen flex flex-col md:flex-row overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="w-full h-full opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage:
              'url("https://grainy-gradients.vercel.app/noise.svg")',
            filter: 'contrast(150%) brightness(100%)',
          }}
        />
        <div
          className="w-full h-full opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* LEFT COLUMN: Fixed Title */}
      <div className="w-full md:w-[25%] border-r border-white/10 p-6 md:p-12 h-full flex flex-col justify-between z-20 bg-background relative shrink-0">
        <SectionHeader
          sectionNumber={EXPERIENCE_META.sectionNumber}
          title={EXPERIENCE_META.title}
          scrollHint={EXPERIENCE_META.scrollHint}
          progressBarRef={progressBarRef}
        />
      </div>

      {/* RIGHT COLUMN: Horizontal Scroll Container */}
      <div className="w-full md:w-[75%] h-full overflow-hidden relative z-10 bg-background">
        {/* Track: width max-content để chứa hết các items hàng ngang */}
        <div ref={trackRef} className="flex h-full w-max">
          {ALL_EXPERIENCE_ITEMS.map((item, i) => (
            <div
              key={i}
              className="exp-row group h-full w-screen md:w-[75vw] flex flex-col justify-center p-6 md:p-12 border-r border-white/10 relative overflow-hidden"
            >
              <div className="ghost-text absolute top-1/2 left-0 -translate-y-1/2 text-[25vw] font-black uppercase text-white/[0.02] select-none pointer-events-none whitespace-nowrap z-0 italic w-full text-center tracking-tighter">
                {'company' in item ? item.company : item.school}
              </div>

              <div className="exp-item-inner max-w-4xl relative z-10 w-full">
                <div className="exp-content-wrapper stagger-container">
                  {/* Header Section */}
                  <div className="flex items-start justify-between mb-10">
                    <div className="flex-1">
                      <span className="exp-period inline-block text-xs font-mono text-gray-500 tracking-widest uppercase mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                        {item.period}
                      </span>
                      <h3 className="exp-title text-5xl md:text-7xl font-bold uppercase text-white group-hover:text-white/90 transition-colors tracking-tighter leading-none break-words">
                        {'company' in item ? item.company : item.school}
                      </h3>
                    </div>
                    {'logo' in item && item.logo ? (
                      <div className="exp-logo relative w-20 h-20 md:w-24 md:h-24 grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110 shrink-0 ml-6">
                        <Image
                          src={item.logo}
                          alt={'company' in item ? item.company : 'Logo'}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div
                        className={`exp-logo w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-500 shrink-0 ml-6 ${'type' in item ? 'group-hover:rotate-12' : ''}`}
                      >
                        <Code2 className="w-10 h-10 md:w-12 md:h-12 text-white/30 group-hover:text-white/60 transition-colors" />
                      </div>
                    )}
                  </div>

                  {/* Role/Degree Section */}
                  <div className="exp-role relative mb-8 pl-6">
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/40 via-white/20 to-transparent rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)]"></div>
                    <span className="text-2xl md:text-5xl font-mono text-white/95 tracking-tight uppercase leading-none block">
                      {'role' in item ? item.role : item.degree}
                    </span>
                    {'gpa' in item && (
                      <div className="mt-3 inline-flex items-center gap-2 text-sm font-mono bg-white/5 px-4 py-2 rounded-full text-white/80 border border-white/10 hover:border-white/30 transition-colors">
                        {item.gpa}
                      </div>
                    )}
                  </div>

                  {/* Description Section */}
                  <div className="exp-description text-base md:text-xl text-gray-400 leading-relaxed mb-8 font-light max-w-3xl">
                    {'description' in item && item.description}
                  </div>

                  {/* Achievements Section */}
                  {'achievements' in item &&
                    item.achievements &&
                    item.achievements.length > 0 && (
                      <div className="exp-achievements mb-10">
                        <div className="flex items-center gap-4 mb-6">
                          <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest whitespace-nowrap">
                            Key Highlights
                          </h4>
                          <div className="h-[1px] w-12 bg-white/20"></div>
                        </div>
                        <ul className="space-y-4">
                          {item.achievements.map((achievement, idx) => (
                            <li
                              key={idx}
                              className="exp-achievement flex items-start gap-4 text-sm md:text-lg text-gray-400 group/item hover:text-white/90 transition-colors"
                            >
                              <span className="text-white/30 mt-2 shrink-0 group-hover/item:text-white/70 transition-colors text-xs">
                                {'//'}
                              </span>
                              <span className="leading-relaxed font-light">
                                {achievement}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {/* Tech Stack Section */}
                  {'tech' in item && (
                    <div className="exp-tech-section">
                      <div className="flex items-center gap-4 mb-6">
                        <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest whitespace-nowrap">
                          Stack
                        </h4>
                        <div className="h-[1px] w-12 bg-white/20"></div>
                      </div>
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        {item.tech.map((t, j) => (
                          <span
                            key={j}
                            className="exp-tech-tag text-[10px] md:text-xs uppercase tracking-[0.2em] px-5 py-3 border border-white/5 rounded-sm text-gray-400 hover:border-white/40 hover:text-white hover:bg-white/5 transition-all duration-300 cursor-default font-mono bg-white/[0.02]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
