'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2 } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: '01',
    role: 'frontend-developer',
    company: 'alchemy',
    period: 'apr 2025 - present',
    description: 'Architecting next-generation Blockchain platforms...',
    logo: '/experiences/alchemy/logo.png',
    tech: ['react', 'blockchain', 'ai', 'ui/ux'],
  },
  {
    id: '02',
    role: 'fullstack-developer',
    company: 'freelance',
    period: '2024 - present',
    description: 'Engineering bespoke web solutions...',
    logo: null,
    tech: ['next.js', 'typescript', 'tailwind'],
  },
];

const education = [
  {
    school: 'university-of-transport',
    degree: 'Major: Information Technology',
    period: '2022 - 2026',
    gpa: 'GPA: 3.64/4',
    description: 'Excellent Student Certification (2023)',
    type: 'edu',
  },
];

const allItems = [...experiences, ...education];

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const container = containerRef.current;

      if (!track || !container || allItems.length === 0) return;

      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth =
          window.innerWidth < 768
            ? window.innerWidth
            : window.innerWidth * 0.75;
        return -(trackWidth - viewportWidth);
      };

      const getScrollDistance = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth =
          window.innerWidth < 768
            ? window.innerWidth
            : window.innerWidth * 0.75;
        return trackWidth - viewportWidth;
      };

      const scrollTween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          scrub: 1,
          snap: {
            snapTo: 1 / (allItems.length - 1),
            duration: { min: 0.2, max: 0.6 },
            delay: 0,
            ease: 'power1.inOut',
          },
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              gsap.to(progressBarRef.current, {
                width: `${self.progress * 100}%`,
                duration: 0.1,
                ease: 'none',
              });
            }
          },
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
        <div>
          <span className="text-xs text-gray-500 uppercase tracking-widest block mb-4">
            01 / Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">
            Experience <br /> & Edu
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

      {/* RIGHT COLUMN: Horizontal Scroll Container */}
      <div className="w-full md:w-[75%] h-full overflow-hidden relative z-10 bg-background">
        {/* Track: width max-content để chứa hết các items hàng ngang */}
        <div ref={trackRef} className="flex h-full w-max">
          {allItems.map((item, i) => (
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
                        alt={(item as any).company}
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
                  {'company' in item ? item.company : (item as any).school}
                </h3>

                <div className="exp-role relative mb-8 pl-4">
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/40 via-white/20 to-transparent"></div>
                  <span className="text-xl font-mono text-white/70 tracking-wide">
                    {'role' in item ? item.role : (item as any).degree}
                  </span>
                </div>

                <div className="exp-description text-lg text-gray-400 leading-relaxed mb-10 font-light max-w-2xl">
                  {'description' in item && item.description}
                  {'gpa' in item && (
                    <div className="mt-2 inline-flex items-center gap-2 text-sm font-mono bg-white/5 px-4 py-2 rounded-full text-white/80 border border-white/10 w-fit hover:border-white/30 transition-colors">
                      {(item as any).gpa}
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
