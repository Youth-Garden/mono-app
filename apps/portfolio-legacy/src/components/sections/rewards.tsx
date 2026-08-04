'use client';
import { getTechIcon, XLogo } from '@/components/common/icons'; // Import helpers
import SectionHeader from '@/components/common/section-header';
import { REWARDS, REWARDS_META } from '@/constants/rewards';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
} from 'lucide-react';
import { memo, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const getSocialMeta = (url: string) => {
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes('facebook'))
    return {
      icon: <Facebook className="w-4 h-4" />,
      color: '#1877F2',
      label: 'Facebook',
    };
  if (lowerUrl.includes('twitter') || lowerUrl.includes('x.com'))
    return {
      icon: <XLogo className="w-3.5 h-3.5" />,
      color: '#000000', // Black for X
      borderColor: '#333333',
      label: 'X (Twitter)',
    };
  if (lowerUrl.includes('linkedin'))
    return {
      icon: <Linkedin className="w-4 h-4" />,
      color: '#0A66C2',
      label: 'LinkedIn',
    };
  if (lowerUrl.includes('instagram'))
    return {
      icon: <Instagram className="w-4 h-4" />,
      color: '#E4405F',
      label: 'Instagram',
    };
  return {
    icon: <Globe className="w-4 h-4" />,
    color: '#333333',
    label: 'Website',
  };
};

function Rewards() {
  const containerRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray('.reward-row');

      items.forEach((item) => {
        const element = item as HTMLElement;
        const ghostText = element.querySelector('.ghost-text');

        // Cinematic Ghost Text Parallax
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

        // Entrance Stagger
        const staggerElements = element.querySelectorAll('.stagger-item');
        if (staggerElements.length > 0) {
          gsap.from(staggerElements, {
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
      // "Curtain Effect" - Pin Rewards so Stack slides over it
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'bottom bottom',
        end: '+=100%',
        pin: true,
        pinSpacing: false,
        scrub: true,
        onUpdate: (self) => {
          // Optional: Add a slight "dim" effect as it gets covered
          const progress = self.progress;
          gsap.set(containerRef.current, {
            filter: `brightness(${1 - progress * 0.5})`,
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
      <div className="grid grid-cols-1 lg:grid-cols-12 relative">
        {/* Pinned Left Side */}
        <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-white/10 p-6 md:p-8 lg:p-12 lg:h-screen lg:sticky top-0 flex flex-col justify-between z-20 bg-background">
          <SectionHeader
            sectionNumber={REWARDS_META.sectionNumber}
            title={REWARDS_META.title}
            scrollHint={REWARDS_META.scrollHint}
            progressBarRef={progressBarRef}
            className="h-full"
          />
        </div>

        {/* Scrollable Right Side */}
        <div className="lg:col-span-9">
          {REWARDS.map((project, index) => (
            <div
              key={index}
              className="reward-row group min-h-[50vh] lg:min-h-screen flex flex-col justify-center p-6 md:p-8 lg:p-12 border-b border-white/10 last:border-b-0 relative overflow-hidden"
            >
              <div className="ghost-text absolute top-1/2 left-0 -translate-y-1/2 text-[15vw] font-black uppercase text-white/[0.02] select-none pointer-events-none whitespace-nowrap z-0 italic w-full text-center tracking-tighter">
                {project.title}
              </div>

              <div className="reward-item-inner max-w-6xl relative z-10 w-full grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-start">
                {/* Left Content */}
                <div className="flex flex-col">
                  {/* Category */}
                  <div className="mb-6 stagger-item">
                    <span className="reward-category text-[10px] font-bold tracking-widest uppercase bg-white text-black px-3 py-1 rounded-sm shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="reward-title text-3xl md:text-3xl lg:text-5xl font-bold uppercase mb-6 text-white tracking-tighter leading-none stagger-item">
                    {project.title}
                  </h3>

                  <div className="reward-role relative mb-8 pl-6 stagger-item">
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/40 via-white/20 to-transparent rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)]"></div>
                    <span className="text-xl md:text-2xl font-mono text-white/90 tracking-tight uppercase leading-none block">
                      {project.role}
                    </span>
                  </div>

                  <p className="reward-description text-sm md:text-base text-gray-400 leading-relaxed mb-8 font-light max-w-2xl stagger-item">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 stagger-item">
                    {project.tech.map((t, i) => {
                      return (
                        <div
                          key={i}
                          className="reward-tech-tag text-[10px] uppercase tracking-[0.05em] px-3 py-2 border border-white/10 rounded-sm bg-white/5 text-gray-300 font-mono flex items-center gap-2 transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:scale-105"
                        >
                          {getTechIcon(t)}
                          <span className="transition-colors">{t}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Social Actions (Vertical) */}
                <div className="flex flex-col gap-3 stagger-item md:w-48 shrink-0 justify-start">
                  {/* Website Link (Primary) */}
                  {project.website && (
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex items-center justify-between gap-3 px-4 py-3 bg-white text-black rounded-sm hover:bg-white/90 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] mb-1"
                    >
                      <span className="text-xs font-bold uppercase tracking-wider">
                        Visit Project
                      </span>
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  )}

                  {/* Social Links Group */}
                  {project.socials && project.socials.length > 0 && (
                    <div className="flex flex-row flex-wrap gap-3 md:flex-col w-full">
                      {project.socials.map((social, idx) => {
                        const meta = getSocialMeta(social.url);
                        return (
                          <a
                            key={idx}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 rounded-sm transition-all group/link hover:scale-[1.02] active:scale-95"
                            style={{
                              backgroundColor: meta.color,
                              border: `1px solid ${meta.borderColor || meta.color}`,
                              boxShadow: `0 0 20px ${meta.color}40`, // Colored glow
                            }}
                          >
                            <span className="flex items-center justify-center text-white">
                              {meta.icon}
                            </span>
                            <span className="text-[10px] font-bold text-white uppercase tracking-wider flex-1">
                              {social.label}
                            </span>
                            <ArrowUpRight className="w-3 h-3 text-white/70 group-hover/link:text-white transition-colors" />
                          </a>
                        );
                      })}
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

export default memo(Rewards);
