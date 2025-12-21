'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: "01", name: "HUNNYPLAY", role: "Architecture", img: "/project1.jpg" },
  { id: "02", name: "CEDRA HUB", role: "Smart Contract", img: "/project2.jpg" },
];

export default function TechnicalWork() {
  const container = useRef(null);

  useGSAP(() => {
    const rows = gsap.utils.toArray('.project-row');
    
    rows.forEach((row: any) => {
      gsap.from(row.querySelector('.p-id'), {
        x: -50,
        opacity: 0,
        scrollTrigger: {
          trigger: row,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="w-full py-24">
      <div className="px-6 mb-12">
        <h2 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4 border-b border-white/10 pb-4">
          Selected Works (2024-2025)
        </h2>
      </div>

      <div className="border-t border-white/10">
        {projects.map((project) => (
          <div key={project.id} className="project-row group relative grid grid-cols-1 md:grid-cols-12 border-b border-white/10 transition-colors hover:bg-white/5">
            
            {/* ID Number */}
            <div className="md:col-span-1 p-6 border-r border-white/10 flex items-start">
              <span className="p-id text-xs text-gray-500 font-mono">({project.id})</span>
            </div>

            {/* Title */}
            <div className="md:col-span-7 p-6 py-12 relative overflow-hidden">
              <h3 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter z-10 relative group-hover:translate-x-4 transition-transform duration-500">
                {project.name}
              </h3>
              <p className="text-sm text-gray-400 mt-2 font-mono uppercase">{project.role}</p>
            </div>

            {/* Hover Reveal Image (Advanced) */}
            <div className="md:col-span-4 hidden md:block relative border-l border-white/10 overflow-hidden min-h-[300px]">
               <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-gray-600">
                 {/* Placeholder for Image - replace with <Image /> when assets are available */}
                 <span className="text-xs uppercase tracking-widest">[Project Preview]</span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
