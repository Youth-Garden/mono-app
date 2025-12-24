'use client';
import Card3D from '@/components/common/card-3d';
import { STACK_META, TECH_STACK } from '@/constants/stack';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Stack() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray('.stack-card');

      cards.forEach((card, index) => {
        const element = card as HTMLElement;
        gsap.from(element, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            once: true,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="stack"
      ref={containerRef}
      className="min-h-screen border-b border-white/10 bg-background snap-start py-20 px-6 md:px-12"
    >
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
            <Card3D
              key={category.domain}
              className="stack-card"
              maxTilt={8}
              scale={1.03}
            >
              <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-8 h-full group">
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Domain Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold uppercase tracking-tight text-white">
                      {category.domain}
                    </h3>
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs font-mono text-gray-400 group-hover:border-white/40 group-hover:text-white transition-colors group-hover:scale-110 duration-300">
                      {category.technologies.length}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] w-full bg-gradient-to-r from-white/20 via-white/40 to-white/20 mb-6" />

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-2">
                    {category.technologies.map((tech) => (
                      <span
                        key={tech.name}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium tracking-wide bg-white/5 border border-white/10 rounded-full text-gray-300 hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-300 cursor-default hover:scale-105"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Depth Shadow */}
                <div
                  className="absolute inset-0 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    boxShadow:
                      '0 20px 60px rgba(0,0,0,0.3), 0 10px 30px rgba(0,0,0,0.2)',
                  }}
                />
              </div>
            </Card3D>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-8 justify-center md:justify-start">
          <div className="text-center md:text-left">
            <div className="text-3xl font-bold text-white mb-1">
              {TECH_STACK.length}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">
              Domains
            </div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-3xl font-bold text-white mb-1">
              {TECH_STACK.reduce(
                (acc, cat) => acc + cat.technologies.length,
                0
              )}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">
              Technologies
            </div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-3xl font-bold text-white mb-1">5+</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">
              Years Experience
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
