'use client';

import { CONTACT_INFO, SOCIAL_LINKS } from '@/constants/contact';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useRef, useState } from 'react';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_LINKS = [
  { label: 'Home', href: '#hero', desc: 'Entry Point' },
  { label: 'Experience', href: '#experience', desc: 'Career Path' },
  { label: 'Rewards', href: '#rewards', desc: 'Achievements' },
  { label: 'Skills', href: '#stack', desc: 'Arsenal' },
  { label: 'Recognition', href: '#recognition', desc: 'Certificates' },
  { label: 'Contact', href: '#contact', desc: 'Get in Touch' },
];

export default function Menu({ isOpen, onClose }: MenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github size={14} />;
      case 'linkedin':
        return <Linkedin size={14} />;
      case 'email':
        return <Mail size={14} />;
      default:
        return null;
    }
  };

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

        // 2. Links Reveal
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

        // 3. Fade In Info (Header Items)
        gsap.fromTo(
          '.menu-header-item',
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.4 }
        );
      } else {
        document.body.style.overflow = '';
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
      className="fixed inset-0 z-10 bg-[#050505] text-white flex flex-col h-[100dvh] overflow-y-auto overflow-x-hidden pointer-events-none custom-scrollbar"
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
      <div className="flex flex-col flex-1 min-h-full p-6 md:p-12 relative z-20">
        <div className="w-full grid grid-cols-3 items-start mb-8 shrink-0 pointer-events-auto">
          <div className="flex flex-col menu-header-item items-start">
            <span className="text-xs font-bold tracking-tight uppercase text-gray-400">
              Navigation
            </span>
            <span className="text-[10px] text-gray-600 uppercase tracking-widest mt-1">
              Select Destination
            </span>
          </div>

          <div className="flex flex-col items-center justify-center menu-header-item gap-2">
            <div className="flex items-center gap-8">
              {SOCIAL_LINKS.map((link) => {
                if (link.platform === 'Email') {
                  return (
                    <button
                      key={link.platform}
                      onClick={handleCopyEmail}
                      className="group flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-neutral-500 hover:text-white transition-all duration-300"
                    >
                      <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                        {getIcon(link.platform)}
                      </span>
                      <span className="relative font-mono">
                        {copied ? 'Copied!' : CONTACT_INFO.email}
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                      </span>
                    </button>
                  );
                }

                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-neutral-500 hover:text-white transition-all duration-300"
                  >
                    <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                      {getIcon(link.platform)}
                    </span>
                    <span className="relative font-mono">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="hidden md:flex justify-end menu-header-item"></div>
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
                <div className="flex-1 flex items-center relative">
                  <div
                    className={`h-[2px] bg-white transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${hoveredLink === index ? 'w-12 md:w-24 mr-6 opacity-100' : 'w-0 mr-0 opacity-0'}`}
                  />
                  <div className="relative z-10">
                    <span
                      className={`text-7xl md:text-[9vh] font-bold tracking-tighter uppercase transition-colors duration-500 leading-none ${hoveredLink !== null && hoveredLink !== index ? 'text-white/20' : 'text-white'}`}
                    >
                      {link.label}
                    </span>
                  </div>
                  <span
                    className={`hidden md:block absolute right-0 text-xs font-mono uppercase tracking-widest text-gray-400 transition-all duration-500 delay-75 ${hoveredLink === index ? 'opacity-100 -translate-x-4' : 'opacity-0 translate-x-0'}`}
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
