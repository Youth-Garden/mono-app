'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const certs = [
  {
    title: 'Google Cloud Skill Boost',
    issuer: 'Google',
    date: '2024',
    image: '/certificates/GG-cloud-skill-boost-Certificaton.jpg',
    accent: 'border-blue-500/50',
  },
  {
    title: 'Top 10 Cardano Hackathon',
    issuer: 'Cardano',
    date: '2024',
    image: '/rewards/cardano/certificate-1.jpg', // Assuming this exists or using a placeholder if needed
    accent: 'border-blue-400/50',
  },
  {
    title: 'Excellent Student',
    issuer: 'University of Transport',
    date: '2023',
    image: '/certificates/GG-cloud-skill-boost-Certificaton.jpg', // Placeholder - reusing or need a generic icon/image
    accent: 'border-yellow-500/50',
    isGeneric: true,
  },
];

export default function Certifications() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from('.cert-card', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: container.current,
          start: 'top 70%',
        },
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="min-h-screen py-24 px-6 md:px-12 bg-background border-b border-white/10 snap-start flex flex-col justify-center"
    >
      <h2 className="text-xs text-gray-500 uppercase tracking-widest mb-12">
        04 / Validations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certs.map((cert, i) => (
          <div
            key={i}
            className={`cert-card group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:border-white/30 transition-all duration-500`}
          >
            {cert.isGeneric ? (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-black">
                <span className="text-4xl font-bold text-white/20">
                  CERTIFIED
                </span>
              </div>
            ) : (
              <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
              </div>
            )}

            <div className="absolute bottom-0 left-0 w-full p-6">
              <span className="text-xs font-mono text-gray-400 block mb-1">
                {cert.issuer} • {cert.date}
              </span>
              <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                {cert.title}
              </h3>
            </div>

            <div
              className={`absolute top-4 right-4 w-2 h-2 rounded-full ${cert.accent.replace('border', 'bg').replace('/50', '')} shadow-[0_0_10px_currentColor]`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
