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

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

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
          scrub: 1,
        },
      });

      const items = gsap.utils.toArray('.exp-row');

      items.forEach((item) => {
        const element = item as HTMLElement;

        const elementsToAnimate = {
          period: element.querySelector('.exp-period'),
          logo: element.querySelector('.exp-logo'),
          title: element.querySelector('.exp-title'),
          role: element.querySelector('.exp-role'),
          description: element.querySelector('.exp-description'),
          techTags: element.querySelectorAll('.exp-tech-tag'),
        };

        gsap.fromTo(
          element,
          {
            x: 100,
            y: 100,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              containerAnimation: scrollTween,
              start: 'left 80%',
              end: 'left 20%',
              scrub: 1,
            },
          }
        );

        if (elementsToAnimate.logo) {
          gsap.fromTo(
            elementsToAnimate.logo,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              scrollTrigger: {
                trigger: element,
                containerAnimation: scrollTween,
                start: 'left 70%',
                end: 'left 30%',
                scrub: 1.5,
              },
            }
          );
        }

        if (elementsToAnimate.title) {
          gsap.fromTo(
            elementsToAnimate.title,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: element,
                containerAnimation: scrollTween,
                start: 'left 70%',
                end: 'left 30%',
                scrub: 1.5,
              },
            }
          );
        }
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
              <div className="max-w-3xl relative z-10 w-full">
                <div className="flex items-center justify-between mb-8">
                  <span className="exp-period text-sm font-mono text-gray-500 tracking-wider">
                    {item.period}
                  </span>
                  {'logo' in item && item.logo ? (
                    <div className="exp-logo relative w-14 h-14 grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110">
                      <Image
                        src={item.logo}
                        alt={'company' in item ? item.company : 'Logo'}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div
                      className={`exp-logo w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-500 ${'type' in item ? 'group-hover:rotate-12' : ''}`}
                    >
                      <Code2 className="w-7 h-7 text-white/30 group-hover:text-white/60 transition-colors" />
                    </div>
                  )}
                </div>

                <h3 className="exp-title text-5xl md:text-7xl font-bold uppercase mb-6 text-white group-hover:text-white/90 transition-colors tracking-tighter leading-none break-words">
                  {'company' in item ? item.company : item.school}
                </h3>

                <div className="exp-role relative mb-8 pl-4">
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/40 via-white/20 to-transparent"></div>
                  <span className="text-xl font-mono text-white/70 tracking-wide">
                    {'role' in item ? item.role : item.degree}
                  </span>
                </div>

                <div className="exp-description text-lg text-gray-400 leading-relaxed mb-10 font-light max-w-2xl">
                  {'description' in item && item.description}
                  {'gpa' in item && (
                    <div className="mt-2 inline-flex items-center gap-2 text-sm font-mono bg-white/5 px-4 py-2 rounded-full text-white/80 border border-white/10 w-fit hover:border-white/30 transition-colors">
                      {'gpa' in item ? item.gpa : ''}
                    </div>
                  )}
                </div>

                {'tech' in item && (
                  <div className="flex flex-wrap gap-2">
                    {item.tech.map((t, j) => (
                      <span
                        key={j}
                        className="exp-tech-tag text-xs uppercase tracking-wider px-4 py-2 border border-white/10 rounded-full text-gray-500 hover:border-white/40 hover:text-white hover:bg-white/5 transition-all duration-300 cursor-default"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
