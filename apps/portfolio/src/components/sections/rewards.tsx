'use client';
import SectionHeader from '@/components/common/section-header';
import { REWARDS, REWARDS_META } from '@/constants/rewards';
import { useProgressBar } from '@/hooks/use-progress-bar';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';

export default function Rewards() {
  const containerRef = useRef<HTMLElement>(null);
  const progressBarRef = useProgressBar({ containerRef });

  return (
    <section
      id="rewards"
      ref={containerRef}
      className="w-full border-b border-white/10 bg-background relative"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 relative">
        {/* Pinned Left Side */}
        <div className="md:col-span-3 border-r border-white/10 p-6 md:p-12 md:h-screen md:sticky top-0 flex flex-col justify-between z-10 bg-background">
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
