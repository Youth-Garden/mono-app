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
    description:
      'Architecting next-generation Blockchain platforms and AI-driven customer support agents. Specializing in micro-frontend architectures, real-time data visualization, and ensuring zero-downtime deployments for mission-critical financial systems. Implementing robust type-safe interfaces and optimizing Core Web Vitals for maximum performance.',
    logo: '/experiences/alchemy/logo.png',
    tech: ['react', 'blockchain', 'ai', 'ui/ux'],
  },
  {
    id: '02',
    role: 'fullstack-developer',
    company: 'freelance',
    period: '2024 - present',
    description:
      'Engineering bespoke web solutions for diverse clients, ranging from high-frequency trading dashboards to immersive 3D marketing sites. Focusing on performance optimization, SEO-driven development, and accessible UI components. Delivering scalable backend services and seamless frontend integrations.',
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
  },
];

export default function Experience() {
  const containerRef = useRef(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray('.exp-row');

      items.forEach((item) => {
        const element = item as HTMLElement;

        // Staggered child animations
        const period = element.querySelector('.exp-period');
        const logo = element.querySelector('.exp-logo');
        const title = element.querySelector('.exp-title');
        const role = element.querySelector('.exp-role');
        const description = element.querySelector('.exp-description');
        const techTags = element.querySelectorAll('.exp-tech-tag');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });

        tl.from(period, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
        })
          .from(
            logo,
            {
              scale: 0.8,
              opacity: 0,
              rotation: -10,
              duration: 0.8,
              ease: 'back.out(1.7)',
            },
            '-=0.4'
          )
          .from(
            title,
            {
              y: 30,
              opacity: 0,
              duration: 0.8,
              ease: 'power3.out',
            },
            '-=0.6'
          )
          .from(
            role,
            {
              x: -20,
              opacity: 0,
              duration: 0.6,
              ease: 'power3.out',
            },
            '-=0.5'
          )
          .from(
            description,
            {
              y: 20,
              opacity: 0,
              duration: 0.8,
              ease: 'power3.out',
            },
            '-=0.4'
          )
          .from(
            techTags,
            {
              scale: 0.8,
              opacity: 0,
              duration: 0.4,
              stagger: 0.05,
              ease: 'back.out(1.7)',
            },
            '-=0.5'
          );

        // Parallax effect on logo
        if (logo) {
          gsap.to(logo, {
            y: -30,
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      });

      // Progress bar animation
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
      id="experience"
      ref={containerRef}
      className="w-full border-b border-white/10 bg-background relative"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 relative">
        {/* Header (Left Column) */}
        <div className="md:col-span-3 border-r border-white/10 p-6 md:p-12 md:h-screen md:sticky top-0 flex flex-col justify-between z-10 bg-background">
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

        {/* Content (Right Column) */}
        <div className="md:col-span-9">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="exp-row group min-h-screen flex flex-col justify-center p-6 md:p-12 border-b border-white/10 last:border-b-0 relative overflow-hidden snap-start"
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="max-w-3xl relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <span className="exp-period text-sm font-mono text-gray-500 tracking-wider">
                    {exp.period}
                  </span>
                  {exp.logo ? (
                    <div className="exp-logo relative w-14 h-14 grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110">
                      <Image
                        src={exp.logo}
                        alt={exp.company}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="exp-logo w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-500">
                      <Code2 className="w-7 h-7 text-white/30 group-hover:text-white/60 transition-colors" />
                    </div>
                  )}
                </div>

                <h3 className="exp-title text-5xl md:text-7xl font-bold uppercase mb-6 text-white group-hover:text-white/90 transition-colors tracking-tighter leading-none">
                  {exp.company}
                </h3>

                <div className="exp-role relative mb-8 pl-4">
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/40 via-white/20 to-transparent"></div>
                  <span className="text-xl font-mono text-white/70 tracking-wide">
                    {exp.role}
                  </span>
                </div>

                <p className="exp-description text-lg text-gray-400 leading-relaxed mb-10 font-light max-w-2xl">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t, j) => (
                    <span
                      key={j}
                      className="exp-tech-tag text-xs uppercase tracking-wider px-4 py-2 border border-white/10 rounded-full text-gray-500 hover:border-white/40 hover:text-white hover:bg-white/5 transition-all duration-300 cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {education.map((edu, i) => (
            <div
              key={i}
              className="exp-row group min-h-screen flex flex-col justify-center p-6 md:p-12 border-b border-white/10 relative overflow-hidden snap-start"
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="max-w-3xl relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <span className="exp-period text-sm font-mono text-gray-500 tracking-wider">
                    {edu.period}
                  </span>
                  <div className="exp-logo w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-500 group-hover:rotate-12">
                    <Code2 className="w-7 h-7 text-white/30 group-hover:text-white/60 transition-colors" />
                  </div>
                </div>

                <h3 className="exp-title text-5xl md:text-7xl font-bold uppercase mb-6 text-white group-hover:text-white/90 transition-colors tracking-tighter leading-none">
                  {edu.school}
                </h3>

                <div className="exp-role relative mb-8 pl-4">
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/40 via-white/20 to-transparent"></div>
                  <span className="text-xl font-mono text-white/70 tracking-wide">
                    {edu.degree}
                  </span>
                </div>

                <div className="exp-description flex flex-col gap-3 mb-10">
                  <span className="inline-flex items-center gap-2 text-sm font-mono bg-white/5 px-4 py-2 rounded-full text-white/80 border border-white/10 w-fit hover:border-white/30 transition-colors">
                    {edu.gpa}
                  </span>
                  <span className="text-lg text-gray-400 font-light">
                    {edu.description}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
