'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_LINKS = [
  { label: 'Home', href: '#hero', desc: 'Entry Point' },
  { label: 'Philosophy', href: '#philosophy', desc: 'Core Values' },
  { label: 'Experience', href: '#experience', desc: 'Career Path' },
  { label: 'Rewards', href: '#rewards', desc: 'Achievements' },
  { label: 'Stack', href: '#stack', desc: 'Technologies' },
  { label: 'Contact', href: '#contact', desc: 'Get in Touch' },
];

export default function Menu({ isOpen, onClose }: MenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);

  useGSAP(
    () => {
      const linkItems =
        linksContainerRef.current?.querySelectorAll('.menu-link-item');

      if (isOpen) {
        document.body.style.overflow = 'hidden';

        // 1. Curtain Reveal
        gsap.to(containerRef.current, {
          clipPath: 'circle(150% at 100% 0%)',
          duration: 1.2,
          ease: 'power4.inOut',
          pointerEvents: 'auto',
        });

        // 2. Staggered 3D Text Reveal from Bottom-Left
        if (linkItems) {
          gsap.fromTo(
            linkItems,
            {
              x: -60,
              y: 60,
              opacity: 0.02,
              rotateY: -40,
              rotateZ: -5,
              skewX: -3,
              transformPerspective: 800,
              transformOrigin: 'left center',
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              rotateY: 0,
              rotateZ: 0,
              skewX: 0,
              transformPerspective: 800,
              transformOrigin: 'left center',
              duration: 0.8,
              stagger: 0.08,
              ease: 'power3.out',
              delay: 0.25,
            }
          );
        }

        // 3. Footer Fade In
        gsap.fromTo(
          '.menu-footer-item',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, delay: 0.4 }
        );
      } else {
        document.body.style.overflow = '';

        // Close Animation
        gsap.to(containerRef.current, {
          clipPath: 'circle(0% at 100% 0%)',
          duration: 1,
          ease: 'power4.inOut',
          pointerEvents: 'none',
        });
      }
    },
    { dependencies: [isOpen], scope: containerRef }
  );

  const handleLinkClick = (href: string) => {
    onClose();
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };

  return (
    <div
      ref={containerRef}
      // FIXED: overflow-y-auto allows scrolling on small screens
      className="fixed inset-0 z-[150] bg-[#050505] text-white flex flex-col h-[100dvh] overflow-y-auto overflow-x-hidden pointer-events-none custom-scrollbar"
      style={{ clipPath: 'circle(0% at 100% 0%)' }}
    >
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none fixed">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '100px 100px',
            opacity: 0.3,
          }}
        />
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        ></div>
      </div>

      {/* --- CONTENT WRAPPER --- */}
      <div className="flex flex-col flex-1 min-h-full p-6 md:p-12 justify-between relative z-20">
        {/* Header */}
        <div className="flex justify-between items-start shrink-0 mb-8">
          <div className="flex flex-col menu-footer-item">
            <span className="text-xs font-bold tracking-tight uppercase text-gray-400">
              Navigation
            </span>
            <span className="text-[10px] text-gray-600 uppercase tracking-widest mt-1">
              Select Destination
            </span>
          </div>
        </div>

        {/* --- LINKS --- */}
        <nav
          ref={linksContainerRef}
          className="flex-1 flex flex-col justify-center w-full max-w-6xl mx-auto"
        >
          {MENU_LINKS.map((link, index) => (
            <div
              key={link.label}
              className="menu-link-item w-full overflow-hidden"
            >
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                onMouseEnter={() => setHoveredLink(index)}
                onMouseLeave={() => setHoveredLink(null)}
                className="group flex items-center py-3 md:py-4 cursor-pointer pointer-events-auto w-full relative"
              >
                {/* Interaction Layer */}
                <div className="flex-1 flex items-center relative">
                  {/* The Line - Expands on hover */}
                  <div
                    className={`h-[2px] bg-white transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                      hoveredLink === index
                        ? 'w-12 md:w-24 mr-6 opacity-100'
                        : 'w-0 mr-0 opacity-0'
                    }`}
                  />

                  {/* The Text Wrapper */}
                  <div className="relative z-10">
                    <span
                      className={`text-7xl md:text-[9vh] font-bold tracking-tighter uppercase transition-colors duration-500 leading-none ${
                        hoveredLink !== null && hoveredLink !== index
                          ? 'text-white/20'
                          : 'text-white'
                      }`}
                    >
                      {link.label}
                    </span>
                  </div>

                  {/* Description (Slide in) */}
                  <span
                    className={`hidden md:block absolute right-0 text-xs font-mono uppercase tracking-widest text-gray-400 transition-all duration-500 delay-75 ${
                      hoveredLink === index
                        ? 'opacity-100 -translate-x-4'
                        : 'opacity-0 translate-x-0'
                    }`}
                  >
                    {link.desc}
                  </span>
                </div>
              </a>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
