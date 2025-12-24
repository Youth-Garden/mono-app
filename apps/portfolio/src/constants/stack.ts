export interface TechItem {
  name: string;
  category?: string;
}

export interface StackCategory {
  domain: string;
  color: string;
  technologies: TechItem[];
}

export const TECH_STACK: StackCategory[] = [
  {
    domain: 'CORE',
    color: 'from-blue-500/20 to-cyan-500/20',
    technologies: [
      { name: 'TypeScript' },
      { name: 'Java' },
      { name: 'Rust' },
      { name: 'Solidity' },
    ],
  },
  {
    domain: 'FRONTEND',
    color: 'from-purple-500/20 to-pink-500/20',
    technologies: [
      { name: 'Next.js 15' },
      { name: 'React' },
      { name: 'Shadcn UI' },
      { name: 'GSAP' },
      { name: 'Tailwind' },
    ],
  },
  {
    domain: 'BACKEND',
    color: 'from-green-500/20 to-emerald-500/20',
    technologies: [
      { name: 'Spring Boot' },
      { name: 'NestJS' },
      { name: 'Prisma' },
      { name: 'PostgreSQL' },
      { name: 'MongoDB' },
    ],
  },
  {
    domain: 'INFRA',
    color: 'from-orange-500/20 to-red-500/20',
    technologies: [
      { name: 'Docker' },
      { name: 'AWS' },
      { name: 'Redis' },
      { name: 'Vercel' },
      { name: 'Turborepo' },
    ],
  },
  {
    domain: 'WEB3',
    color: 'from-yellow-500/20 to-amber-500/20',
    technologies: [
      { name: 'Hardhat' },
      { name: 'Viem' },
      { name: 'Aptos SDK' },
      { name: 'IPFS' },
    ],
  },
];

export const STACK_META = {
  sectionNumber: '03 / Arsenal',
  title: 'Tech Stack',
  subtitle: 'Tools & Technologies',
};
